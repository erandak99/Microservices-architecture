const _ = require('lodash')
const { NatsClient } = require('../lib/nats/NatsClient')
//const { config } = require('../config')

let natsClient = null

async function init() {
  const NatsConfig = {
    nats: {
      serverList: ['127.0.0.1:4223'],
      auth: {
        token: '',
      }
    }
  }

  natsClient = new NatsClient(NatsConfig, 'api', 'admin')

  await natsClient.start()
}
init()

module.exports = {
  natsClient,
  // config,
}
