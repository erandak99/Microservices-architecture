const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const Router = require('koa-router')

const router = new Router()
const app = new Koa()
const { natsClient } = require('./src/connection/testNatsCon')

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await natsClient.shutdown()
    process.exit(0)
  } catch (e) {
    console.error(e)
    process.exit(e)
  }
})

const server = app.listen('7101', () => {
  if (process.send) {
    process.send('ready')
  }
})
module.exports = server
