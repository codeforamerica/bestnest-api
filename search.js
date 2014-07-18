var db = require('./db')
var like = require('like')
var kRootUrl = process.env.URL_ROOT

function search(query) {
  return db.then(function (db) {
    return db.homes
      .where({'properties.full': like.startsWith(query)})
      .select(['properties.full','id','properties.city'])
      .then(function (results) {
        return {
            results: results.map(searchResultView)
          }
      })  
  })
}

function searchResultView(doc) {
  return {
    id: doc.id,
    address: doc.properties.full,
    city: doc.properties.city,
    state: 'TN',
    href: kRootUrl + 'homes/' + doc.id
  }
}

module.exports = search