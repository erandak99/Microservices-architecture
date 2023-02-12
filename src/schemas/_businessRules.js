const Joi = require('joi')

const getRulesSchema = Joi.object({
  storeId: Joi.string().min(3).max(50).required(),
  query: {
    ids: Joi.array(),
    title: Joi.string(),
    active: Joi.boolean()
  },
  from: Joi.number().min(0).default(0),
  size: Joi.number().min(1).default(20),
  trigger: Joi.boolean()
})

const setRulesSchema = Joi.object({
  storeId: Joi.string().min(3).max(50).required(),
  rules: Joi.array().items({
    id: Joi.string().required(),
    operation: Joi.string().required(),
    rule: Joi.object(),
    active: Joi.boolean()
  })
})

module.exports = { getRulesSchema, setRulesSchema }
