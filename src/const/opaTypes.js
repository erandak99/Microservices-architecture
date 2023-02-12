const OPAActions = Object.freeze({
  VIEW: 'view',
  UPDATE: 'update',
  DELETE: 'delete'
})

const businessFunctions = Object.freeze({
  CONFIG: 'config'
})

const OPAConfigType = Object.freeze({
  searchableAttributes: businessFunctions.SEARCHABLE_ATTRIBUTES,
  defaultSortOrder: businessFunctions.SORT_BASE_RANKING
})

module.exports = {
  OPAActions,
  OPAConfigType,
  businessFunctions
}