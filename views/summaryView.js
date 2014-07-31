var b64 = require('base64')
var resolved = require('resolved')
var to = require('dotmap')
var db = require('../db')

var kRootUrl = process.env.URL_ROOT

function summaryView(id) {
  return db.then(function (db) {
    var home = db.homes.byId(id)
    var data = getData(home)

    return resolved({
      id: home.then(to('_id')),
      parcelId: home.then(to('properties.parcel')),
      address: home.then(to('properties.full')),
      data: data
    })
  })
}

function getData(home) {
  return home.then(function (home) {
    var data = {}

    data.owner = getOwner(home)

    return resolved(data)
  })
}

function getOwner(home) {
  return db.then(function (db) {
    return db.parcelOwners
      .where({parcelId: home.properties.parcel})
      .firstOrDefault({})
      .then(function (owner) {
        var id = b64.encode(owner.owner1)

        return {
          id: id,
          name: owner.owner1,
          name2: owner.owner2,
          address: owner.ownerAddress_full,
          city: owner.ownerAddress_city,
          state: owner.ownerAddress_state,
          zipcode: owner.ownerAddress_zipcode,
          href: kRootUrl + 'landlords/' + id
        }
      })
    })
}

module.exports = summaryView
