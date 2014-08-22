var querystring = require('querystring')
var resolved = require('resolved')
var to = require('dotmap')
var db = require('../db')

module.exports = function (codeViolationsView, db, config, comments) {
  var getCodeViolations = codeViolationsView.getCodeViolations

  function summaryView(id) {
      var home = db.homes.byId(id)
      var data = getData(home)

      return resolved({
        id: home.then(to('_id')),
        parcelId: home.then(to('properties.parcel')),
        address: home.then(to('properties.full')),
        city: home.then(to('properties.city')),
        state: 'TN',
        data: data
      })

  }

  function getData(home) {
    return home.then(function (home) {
      var data = {}

      data.owner = getOwner(home)
      data.violations = {
        href: config.rootUrl + 'homes/' + home.id + '/violations',
        summary: getCodeViolations(home).limit(2),
        count: getCodeViolations(home).count()
      }
      data.comments = comments.getBySubject('homes/'+home.id)
      data.userContent = to('data.effective')(home) || {}

      return resolved(data)
    })
  }

  function getOwner(home) {
      return db.parcelOwners
        .where({parcelId: home.properties.parcel})
        .firstOrDefault({})
        .then(function (owner) {
          var id = querystring.escape(owner.owner1)

          return {
            id: id,
            name: owner.owner1,
            name2: owner.owner2,
            address: owner.ownerAddress_full,
            city: owner.ownerAddress_city,
            state: owner.ownerAddress_state,
            zipcode: owner.ownerAddress_zipcode,
            href: config.rootUrl + 'landlords/' + id
          }
        })
  }

  return summaryView
}
