const { HttpResponse } = require('../const/responseCodes')

const toResponse = (statusCode, params = {}) => {
  const { type = 'error', content = null } = params

  if (statusCode < 400) {
    return {
      success: true,
      data: content
    }
  }

  return {
    success: false,
    error: {
      type,
      message: content
    }
  }
}

class Response {
  static success(ctx, params = {}) {
    ctx.status = params.statusCode || HttpResponse.SUCCESS.OK.CODE
    ctx.body = toResponse(ctx.status, params)
    return ctx.body
  }

  static error(ctx, params = {}) {
    ctx.status = params.statusCode
    ctx.body = toResponse(ctx.status, params)
    return ctx.body
  }

  static format(statusCode, content) {
    return { statusCode, content }
  }
}

module.exports = Response
