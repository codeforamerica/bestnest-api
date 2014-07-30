var b64 = require('base64')
var resolved = require('resolved')
var to = require('dotmap')
var db = require('../db')

var kRootUrl = process.env.URL_ROOT

function landlordView(id) {
  var name = b64.decode(id)
  var data = getOwnerHomes(name)

  return resolved({
    id: id,
    name: name,
    data: data
  })
}

function propertyRowView(doc) {
  return {
    id: doc.id,
    address: doc.ownerAddress_full,
    city: doc.ownerAddress_city,
    state: doc.ownerAddress_state,
    //href: kRootUrl + 'homes/' + doc.id
  }
}

function getOwnerHomes(owner) {
  return db.then(function(db) {
    return db.parcelOwners
      .where({owner1: owner})
      .then(function(homes) {
        return homes.map(propertyRowView)
      })
  })
}

module.exports = landlordView
