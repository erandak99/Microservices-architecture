const { Logger } = require('../lib/Logger')

const getLogger = (contextName, config) => new Logger(contextName, config)

module.exports = getLogger