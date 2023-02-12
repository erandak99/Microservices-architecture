/**
 * Thrown when the request body has an invalid format.
 */
// eslint-disable-next-line max-classes-per-file
class InvalidRequestBodyFormat extends Error {
  constructor(message) {
    super(message)
    this.name = 'InvalidRequestBodyFormat'
  }
}

/**
* Thrown when the request had invalid authentication credentials.
*/
class AuthenticationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'AuthenticationError'
  }
}

/**
* Thrown when Authorization failed.
*/
class ForbiddenError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ForbiddenError'
  }
}

module.exports = {
  InvalidRequestBodyFormat,
  AuthenticationError,
  ForbiddenError
}