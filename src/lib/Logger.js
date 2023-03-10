const _ = require('lodash')
const { context, trace } = require('@opentelemetry/api')

class Logger {
  constructor(contextName, config) {
    this.__loggerCtxName = contextName
    this.__loggerConfig = {
      customer: {
        key: _.get(config, 'customer.key')
      },
      logger: {
        instname: _.get(config, 'logger.instname', Math.floor(10000 * Math.random())),
        json: _.get(config, 'logger.json', false)
      }
    }

    this.__consoleCb = _.get(config, 'consoleCb', null)
    this.__logdnaLogger = _.get(config, 'logdnaLogger', null)
    this.__debugLevel = _.get(config, 'logger.debug', false)
  }

  _getTracer() {
    return trace.getTracer(this.__loggerCtxName)
  }

  getLoggerConfig() {
    return this.__loggerConfig
  }

  __getMsgToPrint(msg) {
    let msg2Print = msg
    if (_.isError(msg2Print)) {
      if (_.has(msg2Print, 'response.data')) {
        msg2Print = JSON.stringify(msg2Print.response.data, null, 2)
      } else {
        msg2Print = msg2Print.stack
      }
    } else if (_.isObject(msg2Print)) {
      msg2Print = JSON.stringify(msg2Print, null, 2)
    }

    return msg2Print
  }

  _startSpan(name, options = {}) {
    const tracer = this._getTracer()
    const span = tracer.startSpan(name, options)
    span.setAttribute('loggerCtxName', this.__loggerCtxName)
    return span
  }

  async _startActiveSpan(name, options, ctx, cb) {
    let spanCtx = ctx
    let callBackFn = cb

    if (_.isFunction(ctx)) {
      spanCtx = context.active()
      callBackFn = ctx
    }

    const tracer = this._getTracer()

    const retAfterCtx = await tracer.startActiveSpan(name, {
      ...options
    }, spanCtx, async (span) => {
      try {
        span.setAttribute('loggerCtxName', this.__loggerCtxName)
        const retVal = await callBackFn(span)
        return retVal
      } catch (e) {
        span.recordException(e)
        throw e
      } finally {
        span.end()
      }
    })

    return retAfterCtx
  }

  __log(msg, msg2, logType) {
    const msg2Print = _.compact([
      this.__getMsgToPrint(msg),
      this.__getMsgToPrint(msg2)
    ]).join('\n')

    const customerKey = _.get(this.__loggerConfig, 'customer.key', '--')

    const fullMessageComponents = [
      `{${new Date().toISOString()}}`,
      `{${customerKey}}`,
      `{${this.__loggerConfig.logger.instname}}`,
      `{${this.__loggerCtxName}}`
    ]

    const traceData = {}
    try {
      const currentSpan = trace.getSpan(context.active())
      if (currentSpan) {
        const spanCtx = currentSpan.spanContext()
        if (spanCtx) {
          const ids = []

          const traceId = _.trim(_.get(spanCtx, 'traceId'))
          if (!_.isEmpty(traceId)) {
            traceData.traceId = traceId
            ids.push(traceId)
          }

          const spanId = _.trim(_.get(spanCtx, 'spanId'))
          if (!_.isEmpty(spanId)) {
            traceData.spanId = spanId
            ids.push(spanId)
          }

          if (!_.isEmpty(ids)) {
            fullMessageComponents.push(`{${_.join(ids, '-')}}`)
          }
        }
      }
    } catch (e) {
      // <TODO>
    }

    fullMessageComponents.push(`[${logType}]`)
    fullMessageComponents.push(msg2Print)

    const logMessage = fullMessageComponents.join(' ')

    let logLine = logMessage

    if (this.__loggerConfig.logger.json) {
      logLine = JSON.stringify({
        inst: this.__loggerConfig.logger.instname,
        ctx: this.__loggerCtxName,
        customer: customerKey,
        message: logMessage,
        ...traceData
      })
    }

    if (this.__consoleCb) {
      if (logType === 'ERROR') {
        this.__consoleCb(logLine, true)
      } else {
        this.__consoleCb(logLine, false)
      }
    } else if (logType === 'ERROR') {
      console.error(logLine)
    } else {
      console.log(logLine)
    }

    if (this.__logdnaLogger) {
      const meta = {
        inst: this.__loggerConfig.logger.instname,
        ctx: this.__loggerCtxName,
        customer: customerKey,
        ...traceData
      }

      switch (logType) {
        case 'INFO':
          this.__logdnaLogger.info(logMessage, meta)
          break

        case 'WARN':
          this.__logdnaLogger.warn(logMessage, meta)
          break

        case 'ERROR':
          this.__logdnaLogger.error(logMessage, meta)
          break

        case 'DEBUG':
          this.__logdnaLogger.debug(logMessage, meta)
          break

        case 'FATAL':
          this.__logdnaLogger.fatal(logMessage, meta)
          break

        case 'TRACE':
          this.__logdnaLogger.trace(logMessage, meta)
          break

        default:
          this.__logdnaLogger.info(logMessage, meta)
      }
    }
  }

  _logInfo(msg, msg2 = null) {
    this.__log(msg, msg2, 'INFO')
  }

  _logWarn(msg, msg2 = null) {
    this.__log(msg, msg2, 'WARN')
  }

  _logErr(msg, msg2 = null) {
    this.__log(msg, msg2, 'ERROR')
  }

  _logDebug(msg, msg2 = null) {
    if (this.__debugLevel) {
      this.__log(msg, msg2, 'DEBUG')
    }
  }

  _logFatal(msg, msg2 = null) {
    this.__log(msg, msg2, 'FATAL')
  }

  _logTrace(msg, msg2 = null) {
    this.__log(msg, msg2, 'TRACE')
  }
}

module.exports = {
  Logger
}