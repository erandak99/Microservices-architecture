/**
 * @description This controller will contains configurations related functions
 * @route GET /config
 * @route POST /config
 * @auther  Eranda Ekanayake
 */

const _ = require('lodash')
const { Logger } = require('../lib/Logger')
const ConfigService = require('../services/ConfigService')
const Response = require('../utils/response')
const { HttpResponse } = require('../const/responseCodes')
const { configTypes } = require('../const/config')

class ConfigController extends Logger {
  constructor() {
    super('ConfigController')
  }

  /**
   * Get all store specific assigned configurations
   * @param    {storeId}
   * @param    {configId}
   * @return   {String}
   */
  async getConfig(data) {
    try {
      const { storeId, configId } = data

      const result = await ConfigService.getConfig(storeId, configId)

      if (!result) {
        this._logErr(
          `Get configs service failed- store: ${storeId} configId: ${configId}`
        )
        return Response.format(
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.MESSAGE
        )
      }
      return Response.format(HttpResponse.SUCCESS.OK.CODE,  _.get(result, `${configId}`))
    } catch (e) {
      this._logErr(`Failed to compute get config api. ${e.message}`)

      return Response.format(
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.MESSAGE
      )
    }
  }

  /**
   * Set and update updated configurations according to the store
   * @param    {storeId}
   * @param    {configId}
   * @param    {attributes}
   */
  async setConfig(data) {
    try {
      const { storeId, configId, attributes } = data
      const config = this.getConfigs(attributes, configId)

      const msgData = {
        storeId,
        attributes: {
          configs: [
            {
              id: configId,
              config
            }
          ]
        }
      }

      const result = await ConfigService.setConfig(msgData)

      if (!result) {
        this._logErr(
          `Set configs service failed - store: ${storeId} configId: ${configId}`
        )
        return Response.format(
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          HttpResponse.CLIENT_ERROR.BAD_REQUEST.MESSAGE
        )
      }
      return Response.format(HttpResponse.SUCCESS.OK.CODE, result)
    } catch (e) {
      this._logErr(`Failed to compute set config api. ${e.message}`)

      return Response.format(
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.MESSAGE
      )
    }
  }

  getConfigs(attributes, configId) {   
    let configs = []
    if(configId === configTypes.searchableAttributes) {
      configs = attributes.map((attr) => ({
        name: attr.name,
        ordered: false
      }))
    } else {
      configs = attributes
    }
  
    return configs
  }
}

module.exports = new ConfigController()
