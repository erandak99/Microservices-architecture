const _ = require('lodash')
const { MessageTopics } = require('../lib/nats/Messages')
const { natsClient } = require('../connection/NatsConnection')
const { Logger } = require('../lib/Logger')

class BusinessRulesService extends Logger {
  constructor() {
    super('BusinessRulesService')
  }

  async getRules(storeId, query, from = 0, size = 20, trigger = false) {
    try {
      const result = await natsClient.request(
        storeId,
        MessageTopics.CONFIG.BUSINESS_RULES.GET,
        {
          query,
          from,
          size
        }
      )
      this._logInfo(`get business rules - store: ${storeId} - res: ${result}`)

      if (result) {
        const { success, rules } = result

        const totalCount = rules.total

        if (!success) {
          return false
        }
        const rulesSummery = { total: totalCount }
        const rulesArray = rules.rules
        if (rulesArray) {
          rulesSummery.rules = result.rules.rules
        }
        return rulesSummery
      }
      return false
    } catch (e) {
      this._logErr(`get business rules service failed. ${e.message}`)
      return false
    }
  }

  async updateRule(storeId, rules) {
    try {
      const result = await natsClient.request(
        storeId,
        MessageTopics.CONFIG.BUSINESS_RULES.SET,
        rules
      )
      this._logInfo(
        `update business rules - store: ${storeId} - res: ${result}`
      )

      if (result) {
        const { success, deleted, updated } = result

        if (!success) {
          return false
        }
        return { deleted, updated }
      }
      return false
    } catch (e) {
      this._logErr(`update business rules service failed. ${e.message}`)
      return false
    }
  }
}
module.exports = new BusinessRulesService()
