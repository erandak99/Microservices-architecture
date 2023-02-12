const HttpResponse = Object.freeze({
  // Config
  CLIENT_ERROR: Object.freeze({
    UNAUTHORIZED: {
      CODE: 401,
      MESSAGE: 'Unauthorized'
    },
    BAD_REQUEST: {
      CODE: 400,
      MESSAGE: 'Bad Request'
    },
    FORBIDDEN: {
      CODE: 403,
      MESSAGE: 'Forbidden'
    },
    NOT_FOUND: {
      CODE: 404,
      MESSAGE: 'Not Found'
    },
    NOT_ALLOWED: {
      CODE: 405,
      MESSAGE: 'Method Not Allowed'
    },
    INVALID_REQUEST: {
      CODE: 422,
      MESSAGE: 'The request has invalid parameters'
    }
  }),
  SERVER_ERROR: Object.freeze({
    INTERNAL_SERVER_ERROR: {
      CODE: 500,
      MESSAGE: 'Internal Server Error'
    },
    BAD_GATEWAY: {
      CODE: 502,
      MESSAGE: 'Bad Gateway'
    },
    SERVICE_UNAVAILABLE: {
      CODE: 503,
      MESSAGE: 'Service Unavailable'
    },
    GATEWAY_TIMEOUT: {
      CODE: 504,
      MESSAGE: 'Gateway Timeout'
    }
  }),
  SUCCESS: Object.freeze({
    OK: {
      CODE: 200,
      MESSAGE: 'Ok'
    },
    CREATED: {
      CODE: 201,
      MESSAGE: 'Created'
    }
  })
})

module.exports = {
  HttpResponse
}