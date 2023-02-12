const _ = require('lodash')
const { BigQuery } = require('@google-cloud/bigquery')
const { Logger } = require('../../lib/Logger')
const { config } = require('../../config')
const { getDateQuery, getStorePostfix, fillEmptyPeriod } = require('./util')

const QUERIES = {
  productConversionData: (store, dateQuery, productId) => `
    SELECT
      search_query,
      COUNT(search_query) AS query_count,
      COUNTIF(purchased) AS purchase_count
    FROM
      analytics-prod-258920.dumps_for_demo.search_queries_by_product_${store}
    WHERE
      search_date ${dateQuery}
      AND pid = '${productId}'
    GROUP BY
      search_query
    ORDER BY
      purchase_count DESC,
      query_count DESC
    LIMIT
      100
  `,
  productConversionsByDate: (store, dateQuery) => `
    SELECT
      search_date,
      COUNTIF(purchased) AS purchase_count
    FROM
      analytics-prod-258920.dumps_for_demo.search_queries_by_product_${store}
    WHERE
      search_date ${dateQuery}
    GROUP BY
      search_date
    ORDER BY
      search_date
  `,
  productConversionsByProduct: (store, dateQuery, productId) => `
    SELECT
      IFNULL(SUM(query_count), 0) AS query_count,
      IFNULL(SUM(purchase_count), 0) AS purchase_count,
      IFNULL((SELECT
        SUM(view_count) AS view_count
      FROM
        analytics-prod-258920.dumps_for_demo.product_view_counts_${store}
      WHERE
        search_date ${dateQuery}
        AND pid = '${productId}'), 0) AS view_count
    FROM
      analytics-prod-258920.dumps_for_demo.conversion_rates_by_product_${store}
    WHERE
      search_date ${dateQuery}
      AND pid = '${productId}'
  `
}

class ConvertedProductsReportService extends Logger {
  constructor() {
    super('ConvertedProductsReportService')
    this.__config = config
    this.__bigQuery = new BigQuery({
      projectId: config.analytics.BigQuery.projectId,
      keyFilename: config.analytics.BigQuery.keyFile
    })
  }

  async getProductConversionData(storeId, dateFrom, dateTo, productId) {
    const store = getStorePostfix(storeId)
    const dateQuery = getDateQuery(dateFrom, dateTo)
    const query = QUERIES.productConversionData(store, dateQuery, productId)
    const response = await this.__bigQuery.query(query)
    const results = response[0]
    return results
  }

  async getProductConversionsByDate(storeId, dateFrom, dateTo) {
    const store = getStorePostfix(storeId)
    const dateQuery = getDateQuery(dateFrom, dateTo)
    const query = QUERIES.productConversionsByDate(store, dateQuery)
    const response = await this.__bigQuery.query(query)
    const results = fillEmptyPeriod(response[0], dateFrom, dateTo, 'search_date', {
      purchase_count: 0
    });
    return results
  }

  async getProductConversionsByProduct(storeId, dateFrom, dateTo, productId) {
    const store = getStorePostfix(storeId)
    const dateQuery = getDateQuery(dateFrom, dateTo)
    const query = QUERIES.productConversionsByProduct(store, dateQuery, productId)
    const response = await this.__bigQuery.query(query)
    const results = response[0][0]
    if (results?.view_count < results?.purchase_count) {
      results.view_count = (results?.view_count + results?.purchase_count + 1)
    }
    return results
  }

}
module.exports = new ConvertedProductsReportService()
