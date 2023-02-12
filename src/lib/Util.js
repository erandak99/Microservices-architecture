const _ = require('lodash')

class Util {
  static keyToName(key) {
    let retVal = key.replace(/_+/g, ' ')
    retVal = _.trim(retVal)
    retVal = _.capitalize(retVal)
    return retVal
  }

  static buildKey(str) {
    let retVal = _.trim(str)
    retVal = _.toLower(retVal)
    retVal = retVal.replace(/[\s/]+/g, '_')
    return retVal
  }

  static buildAlphaNumericOnlyKey(str) {
    let retVal = _.trim(str)
    retVal = retVal.replace(/[^a-zA-Z0-9 ]+/g, '')
    return Util.buildKey(retVal)
  }

  static buildSearchableAttribKey(str) {
    let retVal = _.trim(str)
    retVal = retVal.replace(/[^a-zA-Z0-9]+/g, ' ')
    retVal = _.startCase(_.toLower(retVal))
    retVal = retVal.replace(/\s/g, '')
    return `searchable${retVal}`
  }
}

module.exports = {
  Util
}