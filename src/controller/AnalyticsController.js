/**
 * @description This controller will contains analytics related functions
 * @route POST /analytics
 * @auther  Eranda Ekanayake
 */

const { Logger } = require('../lib/Logger')
const Response = require('../utils/response')
const { HttpResponse } = require('../const/responseCodes')
const SearchConversionReportService = require('../services/analytics/SearchConversionReportService')
const ProductCoverageReportService = require('../services/analytics/ProductCoverageReportService')
const SearchNoResultsReportService = require('../services/analytics/SearchNoResultsReportService')
const ConvertedProductsReportService = require('../services/analytics/ConvertedProductsReportService')

class AnalyticsController extends Logger {
  constructor() {
    super('AnalyticsController')
  }

  /**
   * Get search conversion rate statistics summary
   * @param    {storeId}
   * @return   {array}
   */
  async getSearchConversionSummary(data) {
    try {
      const {
        storeId,
        dateFrom,
        dateTo
      } = data

      const result = await SearchConversionReportService.getSearchConversionSummary(
        storeId,
        dateFrom,
        dateTo
      )
      if (!result) {
        this._logErr('BigQuery service failed for getSearchConversionSummary - storeId', storeId)

        return Response.format(
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.MESSAGE
        )
      }
      return Response.format(HttpResponse.SUCCESS.OK.CODE, result)
    } catch (e) {
      this._logErr(`BigQuery service failed for getSearchConversionSummary. ${e.message}`)

      return Response.format(
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.MESSAGE
      )
    }
  }

  /**
   * Get search conversion rate statistics weekly summary
   * @param    {storeId}
   * @return   {array}
   */
  async getSearchConversionWeeklySummary(data) {
    try {
      const { storeId } = data

      const result = await SearchConversionReportService.SearchConversionReportService(
        storeId
      )
      if (!result) {
        this._logErr('BigQuery service failed for getSearchConversionWeeklySummary - storeId', storeId)

        return Response.format(
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.MESSAGE
        )
      }
      return Response.format(HttpResponse.SUCCESS.OK.CODE, result)
    } catch (e) {
      this._logErr(`BigQuery service failed for getSearchConversionWeeklySummary. ${e.message}`)

      return Response.format(
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.MESSAGE
      )
    }
  }

  /**
   * Get search conversion data by query
   * @param    {storeId}
   * @param    {dateFrom}
   * @param    {dateTo}
   * @return   {array}
   */
  async getConversionDataByQuery(data) {
    try {
      const { storeId, dateFrom, dateTo, filter, sortField, sortOrder, offset, size } = data

      const result = await SearchConversionReportService.getConversionDataByQuery(
        storeId,
        dateFrom,
        dateTo,
        filter,
        sortField,
        sortOrder,
        offset,
        size
      )
      if (!result) {
        this._logErr('BigQuery service failed for getConversionDataByQuery - storeId', storeId)

        return Response.format(
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.MESSAGE
        )
      }
      return Response.format(HttpResponse.SUCCESS.OK.CODE, result)
    } catch (e) {
      this._logErr(`BigQuery service failed for getConversionDataByQuery. ${e.message}`)

      return Response.format(
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.MESSAGE
      )
    }
  }

  /**
   * Get products for search query
   * @param    {storeId}
   * @param    {dateFrom}
   * @param    {dateTo}
   * @param    {searchQuery}
   * @return   {array}
   */
  async getProductsForSearchQuery(data) {
    try {
      const { storeId, dateFrom, dateTo, searchQuery } = data

      const result = await SearchConversionReportService.getProductsForSearchQuery(
        storeId,
        dateFrom,
        dateTo,
        searchQuery
      )
      if (!result) {
        this._logErr('BigQuery service failed for getProductsForSearchQuery - storeId', storeId)

        return Response.format(
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.MESSAGE
        )
      }
      return Response.format(HttpResponse.SUCCESS.OK.CODE, result)
    } catch (e) {
      this._logErr(`BigQuery service failed for getProductsForSearchQuery. ${e.message}`)

      return Response.format(
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.MESSAGE
      )
    }
  }

  /**
   * Get search conversion total data by date range
   * @param    {storeId}
   * @param    {dateFrom}
   * @param    {dateTo}
   * @return   {array}
   */
  async getSearchConversionTotalData(data) {
    try {
      const { storeId, dateFrom, dateTo } = data

      const result = await SearchConversionReportService.getTotalData(
        storeId,
        dateFrom,
        dateTo
      )
      if (!result) {
        this._logErr('BigQuery service failed for getTotalData - storeId', storeId)

        return Response.format(
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.MESSAGE
        )
      }
      return Response.format(HttpResponse.SUCCESS.OK.CODE, result)
    } catch (e) {
      this._logErr(`BigQuery service failed for getConversionDataByQuery. ${e.message}`)

      return Response.format(
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.MESSAGE
      )
    }
  }

  /**
   * Get no results search details
   * @param    {storeId}
   * @param    {dateFrom}
   * @param    {dateTo}
   * @param    {searchQuery}
   * @return   {array}
   */
  async getNoResultsData(data) {
    try {
      const {
        storeId,
        dateFrom,
        dateTo,
        queryType,
        filter,
        sortField,
        sortOrder,
        offset,
        size
      } = data

      const result = await SearchNoResultsReportService.getNoResultsData(
        storeId,
        dateFrom,
        dateTo,
        queryType,
        filter,
        sortField,
        sortOrder,
        offset,
        size
      )
      if (!result) {
        this._logErr('BigQuery service failed for getNoResultsData - storeId', storeId)

        return Response.format(
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.MESSAGE
        )
      }
      return Response.format(HttpResponse.SUCCESS.OK.CODE, result)
    } catch (e) {
      this._logErr(`BigQuery service failed for getNoResultsData. ${e.message}`)

      return Response.format(
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.MESSAGE
      )
    }
  }

  /**
   * Get no results search weekly details
   * @param    {storeId}
   * @param    {dateFrom}
   * @param    {dateTo}
   * @param    {searchQuery}
   * @return   {array}
   */
  async getNoResultsWeeklyData(data) {
    try {
      const { storeId, dateFrom, dateTo, queryType } = data

      const result = await SearchNoResultsReportService.getNoResultsWeeklyData(
        storeId,
        dateFrom,
        dateTo,
        queryType
      )
      if (!result) {
        this._logErr('BigQuery service failed for getNoResultsData - storeId', storeId)

        return Response.format(
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.MESSAGE
        )
      }
      return Response.format(HttpResponse.SUCCESS.OK.CODE, result)
    } catch (e) {
      this._logErr(`BigQuery service failed for getNoResultsData. ${e.message}`)

      return Response.format(
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.MESSAGE
      )
    }
  }

  /**
   * Get no results unique count details
   * @param    {storeId}
   * @param    {dateFrom}
   * @param    {dateTo}
   * @return   {array}
   */
  async getNoResultsUniqueCount(data) {
    try {
      const { storeId, dateFrom, dateTo, queryType } = data

      const result = await SearchNoResultsReportService.getNoResultsUniqueCount(
        storeId,
        queryType,
        dateFrom,
        dateTo
      )
      if (!result) {
        this._logErr('BigQuery service failed for getNoResultsUniqueCount - storeId', storeId)

        return Response.format(
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.MESSAGE
        )
      }
      return Response.format(HttpResponse.SUCCESS.OK.CODE, result)
    } catch (e) {
      this._logErr(`BigQuery service failed for getNoResultsData. ${e.message}`)

      return Response.format(
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.MESSAGE
      )
    }
  }


  /**
   * Get product coverage for search query
   * @param    {storeId}
   * @return   {array}
   */
  async getProductCoverage(data) {
    try {
      const { storeId, filter } = data

      const result = await ProductCoverageReportService.getProductCoverage(
        storeId,
        filter
      )
      if (!result) {
        this._logErr('BigQuery service failed for getProductCoverage - storeId', storeId)

        return Response.format(
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.MESSAGE
        )
      }
      return Response.format(HttpResponse.SUCCESS.OK.CODE, result)
    } catch (e) {
      this._logErr(`BigQuery service failed for getProductCoverage. ${e.message}`)

      return Response.format(
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.MESSAGE
      )
    }
  }

  /**
   * Get conversion data for product
   * @param    {storeId}
   * @param    {productId}
   * @return   {array}
   */
  async getProductConversionData(data) {
    try {
      const { storeId, dateFrom, dateTo, productId } = data

      const result = await ConvertedProductsReportService.getProductConversionData(
        storeId,
        dateFrom,
        dateTo,
        productId
      )
      if (!result) {
        this._logErr('BigQuery service failed for getProductConversionData - storeId', storeId)

        return Response.format(
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.MESSAGE
        )
      }
      return Response.format(HttpResponse.SUCCESS.OK.CODE, result)
    } catch (e) {
      this._logErr(`BigQuery service failed for getProductCoverage. ${e.message}`)

      return Response.format(
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.MESSAGE
      )
    }
  }

  /**
   * Get product conversion data for a date range
   * @param    {storeId}
   * @return   {array}
   */
  async getProductConversionsByDate(data) {
    try {
      const { storeId, dateFrom, dateTo } = data

      const result = await ConvertedProductsReportService.getProductConversionsByDate(
        storeId,
        dateFrom,
        dateTo
      )
      if (!result) {
        this._logErr('BigQuery service failed for getProductConversionsByDate - storeId', storeId)

        return Response.format(
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.MESSAGE
        )
      }
      return Response.format(HttpResponse.SUCCESS.OK.CODE, result)
    } catch (e) {
      this._logErr(`BigQuery service failed for getProductConversionsByDate. ${e.message}`)

      return Response.format(
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.MESSAGE
      )
    }
  }

  /**
   * Get product conversion data for a product
   * @param    {storeId}
   * @return   {array}
   */
  async getProductConversionsByProduct(data) {
    try {
      const { storeId, dateFrom, dateTo, productId } = data

      const result = await ConvertedProductsReportService.getProductConversionsByProduct(
        storeId,
        dateFrom,
        dateTo,
        productId
      )
      if (!result) {
        this._logErr('BigQuery service failed for getProductConversionsByDate - storeId', storeId)

        return Response.format(
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.MESSAGE
        )
      }
      return Response.format(HttpResponse.SUCCESS.OK.CODE, result)
    } catch (e) {
      this._logErr(`BigQuery service failed for getProductConversionsByDate. ${e.message}`)

      return Response.format(
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.MESSAGE
      )
    }
  }
}

module.exports = new AnalyticsController()
