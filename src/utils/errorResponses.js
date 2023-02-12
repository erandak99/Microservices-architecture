const errorMessage = (err) => (err.name ? `${err.name}: ${err.message}` : `${err.message}`)

/**
 * Client Failures
 */
module.exports.AuthError = (err) => ({
  statusCode: 401,
  type: 'AUTH_REQUIRED',
  content: err ? errorMessage(err) : 'Authentication is needed to access the requested endpoint.'
})

/**
 * Authentication Failures
 */
module.exports.Forbidden = (err) => ({
  statusCode: 403,
  type: 'FORBIDDEN',
  content: err ? errorMessage(err) : 'You don\'t have enough privileges to perform this action.'
})

module.exports.UnknownEndpoint = {
  statusCode: 404,
  type: 'UNKNOWN_ENDPOINT',
  content: 'The requested endpoint does not exist.'
}

module.exports.InvalidRequest = (err) => ({
  statusCode: 422,
  type: 'INVALID_REQUEST',
  content: err ? errorMessage(err) : 'The request has invalid parameters.'
})

/**
 * Server Errors
 */
module.exports.InternalError = (err) => ({
  statusCode: 500,
  type: 'INTERNAL_ERROR',
  content: err ? errorMessage(err) : 'The server encountered an internal server error.'
})