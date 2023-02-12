const { MessageTopics } = require('../lib/nats/Messages')
const { natsClient } = require('../connection/NatsConnection')
const { Logger } = require('../lib/Logger')

class AuthVerifyService extends Logger {
  constructor() {
    super('AuthVerifyService')
  }

  async validateToken(headers) {
    try {
      const result = await natsClient.request(
        '*',
        MessageTopics.AUTH.VALIDATE.TOKEN,
        headers
      )
      this._logInfo(`validate authentication tokens, res: ${result}`)
      return result
    } catch (e) {
      this._logErr(`validate token service failed. ${e.message}`)
      return false
    }
  }
}
module.exports = new AuthVerifyService()
