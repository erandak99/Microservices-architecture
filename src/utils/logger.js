const fs = require('fs');
const path = require('path');
const _ = require('lodash');

_logError(msg){
  if (this.__logStream) {
    this.__logStream.write(this.__decorateMessage(msg, true) + "\n");
  }
}

__decorateMessage(msg, isError){
  let msgParts = [];

  msgParts.push(moment().format('YYYY-MM-DD HH:mm Z'));

  if (isError) {
    msgParts.push('[ ERROR ]');
  }

  msgParts.push(msg);

  let retVal = msgParts.join(' : ');

  if (isError) {
    retVal = chalk.red(retVal);
  }

  return retVal;
}
