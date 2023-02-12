const { ValidationError } = require('joi')
const businessRules = require('../controller/BusinessRulesController')
const { HttpResponse } = require('../const/responseCodes')
const { getRulesSchema, setRulesSchema } = require('../schemas/_businessRules')
const Response = require('../utils/response')
const authorize = require('../middleware/authorizationVerify')
const { OPAActions, businessFunctions } = require('../const/opaTypes')

module.exports = (router) => {
  /**
   * @swagger
   * /business-rules-query:
   *   post:
   *     description: Get available business rules from the relevent store
   *     tags:
   *      - Business Rules
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: store-id
   *         description: Store id for the relevent store
   *         in: header
   *         required: true
   *         type: string
   *       - name: query
   *         description: Query object with required parameters
   *         in: body
   *         required: true
   *         type: object
   *     responses:
   *       200:
   *         description: success
   *       404:
   *         description: Business rules not found
   */
  router.post('/api/business-rules-query', authorize(businessFunctions.BUSINESS_RULES, OPAActions.VIEW), async (ctx) => {
    const header = ctx.request.headers
    const { query, from, size, trigger } = ctx.request.body
    const data = {
      storeId: header['store-id'],
      query,
      from,
      size,
      trigger
    }
    try {
      await getRulesSchema.validateAsync(data)

      const { statusCode, content } = await businessRules.getRules(data)

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

  /**
   * @swagger
   * /business-rules:
   *   post:
   *     description: Add/Update/Delete business rule
   *     tags:
   *      - Business Rules
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: store-id
   *         description: Store id for the relevent store
   *         in: header
   *         required: true
   *         type: string
   *       - name: body
   *         description: Body content with required parameters
   *         in: body
   *         required: true
   *         type: array
   *         items:
   *           type: object
   *     responses:
   *       200:
   *         description: success
   *       402:
   *         description: Operation failed
   */
  router.post('/api/business-rules', authorize(businessFunctions.BUSINESS_RULES, OPAActions.UPDATE), async (ctx) => {
    const header = ctx.request.headers
    const rules = ctx.request.body
    const data = {
      storeId: header['store-id'],
      rules
    }
    try {
      await setRulesSchema.validateAsync(data)

      const { statusCode, content } = await businessRules.updateRule(data)

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