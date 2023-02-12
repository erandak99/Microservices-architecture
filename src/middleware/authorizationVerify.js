const fetch = require('node-fetch')
const Logger = require('../utils/getLogger')('Auth Verifier')
const UserInfo = require('../services/UserInfoService')
const { config } = require('../config')
const { ForbiddenError, BadRequestError } = require('../utils/error-types')
const { OPAConfigType } = require('../const/opaTypes')
const Response = require('../utils/response')
const { HttpResponse } = require('../const/responseCodes')
const { store } = require('../schemas/_searchableAttributes')

/**
 * Get OPA business function name according to config ID
 * @param {*} ctx
 * @returns
 */
const getOPABusinessFunctionForConfig = (ctx) => {
  let configID
  if (ctx.request.method === 'POST' || ctx.request.method === 'PUT') {
    configID = ctx.request.body.configId
  } else {
    configID = ctx.request.query.configId
  }

  return OPAConfigType[configID]
}

/**
 * Verify whether the user has previlages to perform the requested task
 * @param {*} ctx
 * @param {*} next
 * @param {string} - business function name (searchable_attributes etc.)
 * @param {string} - OPA action type (view, update, detele)
 */
const UserRoleVerify = async (ctx, next, functionName, action) => {
  const storeId = ctx.request.headers['store-id']
  const userRoleInfo = await UserInfo.getUserInfo(ctx, storeId)

  const payload = {
    input: userRoleInfo
  }
  if (functionName === 'config') {
    payload.input.function = getOPABusinessFunctionForConfig(ctx)
  } else {
    payload.input.function = functionName
  }
  payload.input.action = action
  payload.input.storeName = storeId

  const res = await fetch(config.OPAUrl, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  })

  const data = await res.json()
  Logger._logInfo('Successfully retrieve Authentication data from OPA')
  if (data.result) {
    await next()
  } else {
    ctx.throw(403, new ForbiddenError('You don\'t have enough privileges to perform this action'))
  }
}

module.exports = (functionName, action) => {
  return async (ctx, next) => {
    const storeId = ctx.request.headers['store-id']
    const data = {
      storeId
    }
    try {
      await store.validateAsync(data)
    } catch(err) {
      Logger._logErr('Store id required')
      return Response.error(ctx, {
        statusCode: HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
        content: err.message
      })
    }
    
    return UserRoleVerify(ctx, next, functionName, action)
  }
}
