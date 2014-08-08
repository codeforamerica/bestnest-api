var like = require('like')

module.exports = function (db, config) {

  return function search(query) {
    query = String(query).toUpperCase()
      return db.homes
        .where({'properties.full': like.startsWith(query)})
        .select(['properties.full','id','properties.city'])
        .limit(7)
        .then(function (results) {
          return {
              results: results.map(searchResultView)
            }
        })
  }

  function searchResultView(doc) {
    return {
      id: doc.id,
      address: doc.properties.full,
      city: doc.properties.city,
      state: 'TN',
      href: config.rootUrl + 'homes/' + doc.id
    }
  }

}
