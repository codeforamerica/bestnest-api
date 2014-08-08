var resolved = require('resolved')
var to = require('dotmap')

module.exports = function (db) {

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

  codeViolationsView.getCodeViolations = getCodeViolations
  return codeViolationsView

}
