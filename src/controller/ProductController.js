const { ValidationError } = require('joi')
const ProductsService = require('../services/ProductService')
const Response = require('../utils/response')
const { HttpResponse } = require('../const/responseCodes')
const { store } = require('../schemas/_searchableAttributes')
const { catalogProductsSchema } = require('../schemas/_products')
const { Logger } = require('../lib/Logger')

/**
 * @description This controller will contains product catalogue/reports related functions
 * @route POST /product/catalogs
 * @auther  Eranda Ekanayake
 */
class ProductController extends Logger {
  constructor() {
    super('ReportsController')
  }

  /**
   * Get product catalogs from the given query
   * @param    {storeId}
   * @param    {query}
   * @param    {pageSize}
   * @param    {Cursor}
   * @return   {Array}
   */
  async getCatalogs(data) {
    try {
      const { storeId } = data

      const result = await ProductsService.getCatalogs(data)

      if (!result) {
        this._logErr(`Get catalogs service failed - storeId: ${storeId}`)
        return Response.format(
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.MESSAGE
        )
      }
      return Response.format(HttpResponse.SUCCESS.OK.CODE, result)
    } catch (e) {
      this._logErr(`Failed to compute product catalogs api. ${e.message}`)

      return Response.format(
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.MESSAGE
      )
    }
  }

  /**
   * Get Generated token according to the query
   * @param    {storeId}
   * @param    {query}
   * @param    {debug} as boolean
   * @param    {allInfo} as boolean
   * @return   {array}
   */
  async getQueryToken(data) {
    const { storeId, query, debug } = data
    try {
      const result = await ProductsService.getQueryToken(storeId, query, debug)

      if (!result) {
        this._logErr(`get query tokens service failed - storeId: ${storeId}`)

        return Response.format(
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.MESSAGE
        )
      }
      return Response.format(HttpResponse.SUCCESS.OK.CODE, result)
    } catch (e) {
      this._logErr(`Failed to compute query tokens api. ${e.message}`)

      return Response.format(
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.MESSAGE
      )
    }
  }

  /**
   * Get Available feature keys
   * @returns 
   */
  async getAvalibaleFeatureKeys(ctx) {
    const storeId = ctx.request.headers['store-id']
    const data = {
      storeId
    }

    try {
      await store.validateAsync(data)

      const result = await ProductsService.getAvalibaleFeatureKeys(storeId)
      return Response.success(ctx, {
        statusCode: HttpResponse.SUCCESS.OK.CODE,
        content: result
      })
    } catch(err) {
      // this._logErr(`Get available feature feys faild. ${err.message}`)
      if (err instanceof ValidationError) {
        return Response.error(ctx, {
          statusCode: HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          content: err.message
        })
      }
      return Response.error(ctx, {
        statusCode: HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        content: err.message
      })
    }
  }

  /**
   * Get Feature Values
   * @returns
   */
  async getFeatureValues(ctx) {
    const storeId = ctx.request.headers['store-id']
    const features = ctx.request.body.features

    try {
      const result = await ProductsService.getFeatureValues(storeId, features)
      return Response.success(ctx, {
        statusCode: HttpResponse.SUCCESS.OK.CODE,
        content: result
      })
    } catch(err) {
      if (err instanceof ValidationError) {
        return Response.error(ctx, {
          statusCode: HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          content: err.message
        })
      }
      return Response.error(ctx, {
        statusCode: HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        content: err.message
      })
    }
  }

  /**
   * Get Product Details
   * @returns
   */
  async getProductDetails(ctx) {
    const storeId = ctx.request.headers['store-id']
    const productid = ctx.request.params.productid

    try {
      const result = await ProductsService.getProductDetails(storeId, productid)
      if (!result.success && result.errors[0] === 'Product not found') {
        return Response.error(ctx, {
          statusCode: HttpResponse.CLIENT_ERROR.NOT_FOUND.CODE,
          content: result.errors[0]
        })
      }
      if (!result.success) {
        return Response.error(ctx, {
          statusCode: HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
          content: result.errors
        })
      }

      return Response.success(ctx, {
        statusCode: HttpResponse.SUCCESS.OK.CODE,
        content: result.product
      })
    } catch (err) {
      if (err instanceof ValidationError) {
        return Response.error(ctx, {
          statusCode: HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          content: err.message
        })
      }
      return Response.error(ctx, {
        statusCode: HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        content: err.message
      })
    }
  }
}

module.exports = new ProductController()
