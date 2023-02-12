const { ValidationError } = require('joi')
const config = require('../controller/ConfigController')
const { HttpResponse } = require('../const/responseCodes')
const { store, setAttributes } = require('../schemas/_searchableAttributes')
const Response = require('../utils/response')
const authorize = require('../middleware/authorizationVerify')
const { OPAActions, businessFunctions } = require('../const/opaTypes')
const { configTypes } = require('../const/config')

module.exports = (router) => {
  /**
   * @swagger
   * /config:
   *   get:
   *     description: Get available configurations from the relevent store from the configId
   *     tags:
   *      - Configurations
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: store-id
   *         description: Store id for the relevent store
   *         in: header
   *         required: true
   *         type: string
   *       - name: configId
   *         description: Config id for the relevent configuration
   *         in: query
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: success
   *       404:
   *         description: attributes not found
   */
  router.get('/api/config', authorize(businessFunctions.CONFIG, OPAActions.VIEW), async (ctx) => {
    const header = ctx.request.headers
    const { configId } = ctx.request.query
    const data = {
      storeId: header['store-id'],
      configId
    }
    try {
      await store.validateAsync(data)

      const { statusCode, content } = await config.getConfig(data)

      if (statusCode !== HttpResponse.SUCCESS.OK.CODE) {
        return Response.error(ctx, {
          statusCode,
          content
        })
      }
      return Response.success(ctx, {
        statusCode,
        content
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
  })

  // todo:check parameter auto generation
  /**
   * @swagger
   * /config:
   *   post:
   *     description: Update available configurations from the relevent store from the configId
   *     tags:
   *       - Configurations
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: store-id
   *         description: Store id for the relevent store
   *         in: header
   *         required: true
   *         type: string
   *       - name: configId
   *         description: Configuration id
   *         in: query
   *         type: string
   *       - name: attributes
   *         description: Configuration changes data-set
   *         in: query
   *         type: object
   *     responses:
   *       200:
   *         description: success
          400:
   *         description: configs not updated
   */
  router.post('/api/config', authorize(businessFunctions.CONFIG, OPAActions.UPDATE), async (ctx) => {
    const header = ctx.request.headers
    const { configId, attributes } = ctx.request.body
    const data = {
      storeId: header['store-id'],
      configId,
      attributes
    }
    try {
      await setAttributes.validateAsync(data)

      const { statusCode, content } = await config.setConfig(data)

      if (statusCode !== HttpResponse.SUCCESS.OK.CODE) {
        return Response.error(ctx, {
          statusCode,
          content
        })
      }
      return Response.success(ctx, {
        statusCode,
        content
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
  })
}
