const url = require('url')
const { isEmpty, values } = require('lodash')
const unProtectedRoutes = require('../config/unauthenticatedRoutes')
const { AuthenticationError } = require('../utils/error-types')
const Logger = require('../utils/getLogger')('Auth Verifier')
const AuthVerifyService = require('../services/AuthVerifyService')

const verifyAuthToken = async (ctx, next) => {
  const req = ctx.request
  const authHeaders = {
    amznOidcDataToken: req.header['x-amzn-oidc-data'],
    amznAccessToken: req.header['x-amzn-oidc-accesstoken'],
    amznIdentityToken: req.header['x-amzn-oidc-identity'],
    oktaAccessToken: req.header.authorization
  }

  if (values(authHeaders).every((authHeader) => isEmpty(authHeader))) {
    ctx.throw(401, new AuthenticationError('Invalid authentication credentials'))
  }
  const result = await AuthVerifyService.validateToken(authHeaders)
  if (!result) {
    ctx.throw(500, new Error('Validate tokens service failed'))
  }
  const { isValid, userClaims } = result.content
  if (isValid) {
    Logger._logInfo('Valid Token, Successfully Authenticated')
    ctx.state = { ...ctx.state, ...userClaims }
  } else {
    ctx.throw(401, new AuthenticationError('Invalid authentication credentials'))
  }
  await next()
}

const allowUnprotectedRoute = async (ctx, next) => {
  await next()
}

module.exports = () => function getAuthVerifier(ctx, next) {
  const req = ctx.request
  const urlPath = url.parse(req.url).pathname
  const isUnProtected = unProtectedRoutes.includes(urlPath)
  if (isUnProtected) {
    return allowUnprotectedRoute(ctx, next)
  }
  return verifyAuthToken(ctx, next)
}