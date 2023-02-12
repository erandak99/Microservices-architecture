const Joi = require('joi')

const store = Joi.object({
  storeId: Joi.string().min(3).max(50).required(),
  configId: Joi.string().min(5)
})
const setAttributes = Joi.object({
  storeId: Joi.string().min(3).max(50).required(),
  configId: Joi.string().min(5).required(),
  attributes: Joi.array().required()
})

module.exports = { store, setAttributes }
