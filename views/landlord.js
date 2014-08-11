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
    return db.homes.where({'properties.parcel': doc.parcelId})
      .select(['id','properties.full','properties.city'])
      .first()
      .then(function (home) {
        return {
          id: home.id,
          address: home.properties.full,
          city: home.properties.city,
          state: 'TN',
          href: config.rootUrl + 'home/' + home.id
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
