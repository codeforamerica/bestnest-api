var querystring = require('querystring')
var resolved = require('resolved')
var to = require('dotmap')

module.exports = function (db, config) {

  function landlordView(id) {
    var name = querystring.unescape(id)
    var data = getOwnerHomes(name)

    return resolved({
      id: id,
      name: name,
      data: data
    })
  }

  function propertyRowView(doc) {
    return getPropertyId(doc.parcelId)
      .then(function(id) {
        return {
          id: id,
          address: doc.ownerAddress_full,
          city: doc.ownerAddress_city,
          state: doc.ownerAddress_state,
          href: config.rootUrl + 'homes/' + id
        }
    })
  }

  function getPropertyId(parcelId) {
    return db.homes
      .where({'properties.parcel': parcelId})
      .select(['id']).first()
      .then(function(home){
        return home.id
      })
  }

  function getOwnerHomes(owner) {
    return db.parcelOwners
      .where({owner1: owner})
      .then(function(homes) {
        return resolved(homes.map(propertyRowView))
      })
  }

  return landlordView
}
