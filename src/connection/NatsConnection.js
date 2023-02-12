const { NatsClient } = require('../lib/nats/NatsClient')
const { config } = require('../config')

const NatsConfig = config.natsConfig

const natsClient = new NatsClient(NatsConfig, 'api', 'admin')

async function init() {
  await natsClient.start()
}
init()

module.exports = {
  natsClient,
  config
}
