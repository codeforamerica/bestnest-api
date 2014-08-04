var resolved = require('resolved')
var to = require('dotmap')

var db
require('../db').then(function (_db) {
  console.log('got db')
  db = _db
})

function codeViolationsView(id) {
  var home = db.homes.byId(id)
  var data = home.then(getCodeViolations)

  return resolved({
    id: home.then(to('_id')),
    data: data
  })
}

function getCodeViolations(home) {
  return db.codeViolations
    .where({address: home.properties.full})
    .sort([['violationId', 'desc']])
}

module.exports = codeViolationsView
module.exports.getCodeViolations = getCodeViolations
