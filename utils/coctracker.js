var Filter = require('bad-words');
var customFilter = new Filter({ placeHolder: '~' });


function badwordstracker(message) {
  const messagecheck = customFilter.clean(message);
  if (messagecheck.includes('~')) {
    return '~'
  } else {
    return messagecheck;
  }
}
module.exports = badwordstracker;