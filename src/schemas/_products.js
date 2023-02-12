const Joi = require('joi')

const catalogSchema = Joi.object({
  storeId: Joi.string().min(3).max(50).required(),
  query: Joi.object({
    text: Joi.string().allow(null, '').max(50),
    category: Joi.string().allow(null, '').max(50),
    productIds: Joi.array().allow(null, '').max(100)
  }),
  cursor: Joi.string().allow(null, ''),
  offset: Joi.number().allow(null, '').max(10000),
  pageSize: Joi.number().allow(null, '')
})

const queryTokenSchema = Joi.object({
  storeId: Joi.string().min(3).max(50).required(),
  query: Joi.string().required(),
  debug: Joi.boolean().default(false)
})

module.exports = { catalogSchema, queryTokenSchema }
