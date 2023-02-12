const _ = require('lodash')
const fs = require('fs')

let config = null

async function main() {
  let configName = 'micro_service'
  if (process.argv.length > 2) {
    [, , configName] = process.argv
  }

  if (_.isEmpty(configName)) {
    console.error('Please provide a config name')
  } else {
    config = {
      configName,
      ...JSON.parse(
        fs.readFileSync(`/etc/eranda/config/${configName}.json`, 'utf8')
      )
    }
  }
}
main()

module.exports = {
  config
}
