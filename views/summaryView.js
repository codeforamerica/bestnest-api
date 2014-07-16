var resolved = require('resolved')
var to = require('dotmap')
var db = require('../db')

function summaryView(id) {
  return db.then(function (db) {
    var home = db.homes.byId(id)
    var data = db.data.where({homeId: id})

    return resolved({
      id: home.then(to('_id')),
      parcelId: home.then(to('properties.parcel')),
      address: home.then(to('properties.full')),
      data: data.then(function (docs) {
        return {}
      })
    })
  })
}

module.exports = summaryView