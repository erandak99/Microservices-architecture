const Joi = require('joi')

const reportSchema = Joi.object({
  storeId: Joi.string().min(3).max(50).required(),
  reportId: Joi.string().min(3).required(),
  query: Joi.alternatives(
    Joi.string().min(1).max(50).allow(null, ''),
    Joi.object().keys({
      text: Joi.string().min(1).max(50).allow(null, ''),
      exact: Joi.boolean()
    })
  ),
  cursor: Joi.string().allow(null, ''),
  pageSize: Joi.number().allow(null, '')
})

module.exports = { reportSchema }
