var resolved = require('resolved')
var hesSoapClient = require('hes-soap-client')
var memoize = require('memoizee')

module.exports = function (db, config) {
  
  function energyView (id) {
    return resolved({
      id: config.rootUrl + 'homes/' + id,
      energyUsage: getUsage(id),
      props: getHomeProperties(id)
    })
  }

  function getHomeProperties(id) {
    return db.homes
            .where({_id: id})
            .select([
              'properties.squareFootage',
              'properties.yearBuilt',
              'properties.zipcode'
              ])
            .first()
            .then(function (doc) {
              return {
                squareFootage: doc.properties.squareFootage,
                yearBuilt: doc.properties.yearBuilt,
                zipcode: doc.properties.zipcode
              }
            })
  }

  var getUsage = memoize(getUsage_)

  function getUsage_(homeId) {
    return getHomeProperties(homeId)
      .then(function (home) {
        return hesSoapClient({
          apiKey: config.hesApiKey,
          zipCode: home.zipcode,
          area: home.squareFootage,
          year: home.yearBuilt
        })
      })
  }

  return energyView
}