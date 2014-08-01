var resolved = require('resolved')
var to = require('dotmap')
var db = require('../db')

var kRootUrl = process.env.URL_ROOT

function codeViolationsView(id) {
  return db.then(function (db) {
    var home = db.homes.byId(id)
    var data = getData(home)

    return resolved({
      id: home.then(to('_id')),
      data: data
    })
  })
}

function getData(home) {
  return home.then(function (home) {
    var data = getCodeViolations(home)

    return resolved(data)
  })
}


function getCodeViolations(home, limit) {
  return db.then(function(db) {
    return db.codeViolations
      .where({address: home.properties.full})
      .limit(limit)
      .sort([['violationId', 'desc']])
      .then(function (violations) {
        return violations
      })

  })
}

module.exports = codeViolationsView
module.exports.getCodeViolations = getCodeViolations
