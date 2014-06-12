var resolved = require('resolved')
var to = require('dotmap')
var db = require('../db')

function summaryView(id) {
  return db.then(function (db) {
    var parcel = db.parcels.byId(id)
    var data = db.data.where({parcelId: id})

    return resolved({
      id: parcel.then(to('_id')),
      parcelId: parcel.then(to('parcelId')),
      address: parcel.then(to('address.full')),
      data: data.then(function (docs) {
        return {}
      })
    })
  })
}

module.exports = summaryView