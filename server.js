const Koa = require('koa')
const { koaSwagger } = require('koa2-swagger-ui')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const Router = require('koa-router')
const { LogDNALogger } = require('./src/lib/LogDNALogger')

const router = new Router()
require('./swagger')(router)
require('./src/routes/config')(router)
require('./src/routes/businessRules')(router)
require('./src/routes/analytics')(router)
const { natsClient, config } = require('./src/connection/NatsConnection')
const authenticationVerify = require('./src/middleware/authenticationVerify')
const errorHandler = require('./src/middleware/error-handler')

async function main() {
  if (config) {
    const app = new Koa()

    app
      .use(errorHandler())
      .use(cors())
      .use(bodyParser())
      .use(authenticationVerify())
      .use(router.routes())
      .use(router.allowedMethods())
      .use(
        koaSwagger({
          routePrefix: '/api-doc',
          swaggerOptions: {
            url: './swagger.json'
          }
        })
      )
    config.logdnaLogger = new LogDNALogger(config)
    await config.logdnaLogger.init()

    // Graceful shutdown
    process.on('SIGINT', async () => {
      try {
        await natsClient.drainAllSubscriptions()

        await natsClient.shutdown()

        if (config.logdnaLogger) {
          await config.logdnaLogger.shutdown()
        }
        process.exit(0)
      } catch (e) {
        console.error(e)
        process.exit(e)
      }
    })

    app.listen(config.serverPort, () => {
      console.log(`App is listening on port ${config.serverPort}`)

      if (process.send) {
        process.send('ready')
      }
    })
  }
}
main()
