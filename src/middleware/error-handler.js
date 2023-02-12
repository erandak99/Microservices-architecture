const Response = require('../utils/response')
const {
  InvalidRequestBodyFormat,
  AuthenticationError,
  ForbiddenError
} = require('../utils/error-types')
const {
  InvalidRequest, AuthError, Forbidden, InternalError
} = require('../utils/errorResponses')
const { HttpResponse } = require('../const/responseCodes')
/**
 * Return middleware that handle exceptions in Koa.
 * Dispose to the first middleware.
 *
 * @return {function} Koa middleware.
 */

module.exports = () => async function errorHandler(ctx, next) {
  try {
    await next()
    if (!ctx.body && (!ctx.status || ctx.status === 404)) {
      console.log(
        new Error('UNKNOWN_ENDPOINT: The requested endpoint does not exist.')
      )
      return Response.error(ctx, {
        statusCode: HttpResponse.CLIENT_ERROR.NOT_FOUND.CODE,
        type: 'Unautherized Request',
        content: HttpResponse.CLIENT_ERROR.NOT_FOUND.MESSAGE
      })
    }
    return true
  } catch (error) {
    ctx.app.emit('error', error, ctx)
    console.log(error)

    switch (true) {
      case error instanceof InvalidRequestBodyFormat:
        return Response.error(ctx, InvalidRequest())
      case error instanceof AuthenticationError:
        return Response.error(ctx, AuthError(error))
      case error instanceof ForbiddenError:
        return Response.error(ctx, Forbidden(error))
      default:
        return Response.error(ctx, InternalError(error))
    }
  }
}
