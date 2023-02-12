/**
 * @description This controller will contains business rules related functions
 * @route POST /business-rules
 * @route POST /business-rules-update
 * @auther  Eranda Ekanayake
 */

const { Logger } = require('../lib/Logger')
const BusinessRulesService = require('../services/BusinessRulesService')
const Response = require('../utils/response')
const { HttpResponse } = require('../const/responseCodes')

class BusinessRulesController extends Logger {
  constructor() {
    super('BusinessRulesController')
  }

  /**
   * Get all available business rules / get business rules by Id from the store
   * @param    {storeId}
   * @param    {from}
   * @param    {size}
   * @param    {trigger} as boolean
   * @return   {array}
   */
  async getRules(data) {
    try {
      const { storeId, query, from, size, trigger } = data

      const result = await BusinessRulesService.getRules(
        storeId,
        query,
        from,
        size,
        trigger
      )
      if (!result) {
        this._logErr('get business rules service failed - storeId', storeId)

        return Response.format(
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.MESSAGE
        )
      }
      return Response.format(HttpResponse.SUCCESS.OK.CODE, result)
    } catch (e) {
      this._logErr(`Failed to compute get business rule api. ${e.message}`)

      return Response.format(
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.MESSAGE
      )
    }
  }

  /**
   * Add/Update/Delete/Action new business rule to the store
   * @param    {storeId}
   * @param    {operation}
   * @param    {rule}
   */
  async updateRule(data) {
    try {
      const { storeId, rules } = data

      const result = await BusinessRulesService.updateRule(storeId, rules)

      if (!result) {
        this._logErr(`update business rules service failed - storeId: ${storeId}`)

        return Response.format(
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.MESSAGE
        )
      }
      return Response.format(HttpResponse.SUCCESS.OK.CODE, result)
    } catch (e) {
      this._logErr(`Failed to compute update business rule api. ${e.message}`)

      return Response.format(
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.MESSAGE
      )
    }
  }
}

module.exports = new BusinessRulesController()
