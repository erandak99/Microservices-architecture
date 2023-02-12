const jsdoc = require('swagger-jsdoc')
const { config } = require('./src/config')

module.exports = (router) => {
  const swaggerDefinition = {
    info: {
      title: 'Mirco services',
      version: '1.0',
      description:
        'test',
      termsOfService: 'test'
    },
    securityDefinitions: {
      bearerAuth: {
        name: 'Authorization',
        in: 'header',
        type: 'apiKey',
        description: 'JWT Authorization header'
      }
    },
    security: [{ bearerAuth: [] }],
    host: config.swaggerHost,
    basePath: '/api',
    schemes: ['https', 'http']
  }
  const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js']
  }
  const swaggerSpec = jsdoc(options)

  router.get('/swagger.json', async (ctx) => {
    ctx.set('content-type', 'application/json')
    ctx.body = swaggerSpec
  })
}
