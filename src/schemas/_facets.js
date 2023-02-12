const Joi = require('joi')
const { STRING_PATTEREN } = require('../const/regexPatterns')

const swatchTypes = Object.freeze({
  COLOR: 'color',
  CLASS: 'class',
  IMAGE: 'image'
})

const getFacetSchema = Joi.object({
  key: Joi.string().regex(STRING_PATTEREN).min(1).max(100).required()
})

const deleteFacetsSchema = Joi.object({
  keys: Joi.array().items(
      Joi.string().regex(STRING_PATTEREN).min(1).max(100)
    ).min(1).max(100).required()
})

const orderFacetsSchema = Joi.object({
  keys: Joi.array().items(
    Joi.string().regex(STRING_PATTEREN).min(1).max(100)
  ).min(1).max(200).required()
})

const createFacetSchema = Joi.object({
  key: Joi.string().regex(STRING_PATTEREN).min(1).max(100),
  name: Joi.string().min(1).max(100),
  searchableAttributes: Joi.array().items(Joi.string().max(100)).max(100),
  features: Joi.array().items(Joi.string().regex(STRING_PATTEREN).max(100)).max(100),
  maxCount: Joi.number().required(),
  showMore: Joi.boolean().required(),
  maxCountWithShowMore: Joi.number().min(1).max(100),
  includeSearch: Joi.boolean().required(),
  showCount: Joi.boolean().required(),
  values: Joi.array().min(1).max(500).required().items(
    Joi.object().keys({
      name: Joi.string().min(1).max(100).required(),
      searchableAttribute: Joi.string().max(100),
      feature: Joi.string().regex(STRING_PATTEREN).max(100),
      searchableAttributeValues: Joi.array().items(Joi.string().min(1).max(100)).max(100),
      keys: Joi.array().items(Joi.string().min(1).max(100)).max(100),
      swatchType: Joi.string().valid(swatchTypes.COLOR, swatchTypes.CLASS, swatchTypes.IMAGE),
      swatch: Joi.alternatives().conditional('swatchType', { is: Joi.string(), then: Joi.string().required() }),
    }).or('searchableAttribute', 'feature')
  )
})

const getPreSignedUrlSchema = Joi.object({
  env: Joi.string().required(),
  fileName: Joi.string().required(),
  facetName: Joi.string().required()
})

module.exports = { 
  deleteFacetsSchema, 
  getFacetSchema, 
  orderFacetsSchema, 
  createFacetSchema, 
  getPreSignedUrlSchema 
}
