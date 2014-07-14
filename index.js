var express = require('express')
var querystring = require('querystring')
require('polyfill-promise')
var logger = require('morgan')
var EngineLight = require('engine-light')
var db = require('./db')
var cors = require('cors')
var like = require('like')

var kRootUri = 'http://' + process.env.URI_ROOT

var summaryView = require('./views/summaryView')

var http = express()

http.use(logger())
http.use((new EngineLight).getMiddleware())
http.use(cors({methods: ['GET']}))

function respondWith(fn) {
  // create an express response handler
  // from a promise-returning function
  return function (req, res) {
    Promise.resolve()
      .then(function () {
        return fn(req)
      })
      .then(function (val) {
        res.send(val)
      })
      .catch(function (e) {
        res.send(500, 'error')
        console.error('error:', e && e.stack ? e.stack : e)
      })
  }
}

http.get('/', respondWith(function (req) {
  return "hey sup"
}))

function startsWith(q) {
  // unsafe, should escape regex chars + check for slow regexps
  return new RegExp('^' + q)
}

http.get('/search', respondWith(function (req) {
  var query = req.query.q
  if (query) {
    // search by address
    return db.then(function (db) {
      return db.parcels
        .where({'address.full': like.startsWith(query)})
        .select(['address.full','id'])
        .then(function (docs) {
          return JSON.stringify({
            results: docs.map(function (doc) {
              return {
                id: doc.id,
                address: doc.address.full,
                href: kRootUri + 'homes/' + doc.id
              }
            })
          })
      })
    })
  }

  throw new Error('invalid search')
}))

http.get('/homes/:id', respondWith(function (req) {
  var id = req.params.id
  return summaryView(id)
    .then(function (doc) {
      return JSON.stringify(doc)
    })

}))

// console.log(app._app._routes)

http.listen(process.env.PORT)