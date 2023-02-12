const { MessageTopics } = require('../lib/nats/Messages')
const { natsClient } = require('../connection/NatsConnection')
const { Logger } = require('../lib/Logger')

class ConfigService extends Logger {
  constructor() {
    super('ConfigService')
  }

  async getConfig(storeId, configId) {
    try {
      const result = await natsClient.request(
        storeId,
        MessageTopics.CONFIG.SEARCH.GET_CONFIGS,
        {
          ids: [configId]
        }
      )
      this._logInfo(
        `get config - store: ${storeId} configId: ${configId} res: ${result}`
      )

      if (result) {
        const { success, configMap } = result

        if (!success) {
          return false
        }
        return configMap
      }
      return false
    } catch (e) {
      this._logErr(`get config service failed. ${e.message}`)
      return false
    }
  }

  async setConfig(data) {
    try {
      const { storeId, attributes } = data

      const result = await natsClient.request(
        storeId,
        MessageTopics.CONFIG.SEARCH.SET_CONFIG,
        attributes
      )
      this._logInfo(`set attributes - storeId: ${storeId} res: ${result}`)

      if (result) {
        const { success } = result

        if (!success) {
          return false
        }
        return result
      }
      return false
    } catch (e) {
      this._logErr(`set config service failed. ${e.message}`)
      return false
    }
  }
}
module.exports = new ConfigService()
