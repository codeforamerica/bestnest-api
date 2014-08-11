var respondWith = require('./respondWith')
var html2plaintext = require('html2plaintext')
var funderscore = require('funderscore')
var logger = require('morgan')
var EngineLight = require('engine-light')
var cors = require('cors')
var JSONBody = require('body/json')

// var summaryView = require('./views/summaryView')
// var landlordView = require('./views/landlordView')
// var codeViolationsView = require('./views/codeViolationsView')


module.exports = function (
  summaryView,
  landlordView,
  codeViolationsView,
  search,
  comments,
  config
) {

  var express = require('express')
  var http = express()

  http.use(logger())
  http.use((new EngineLight).getMiddleware())
  http.use(cors({methods: ['GET']}))


  http.get('/', respondWith(function (req) {
    return "hey sup"
  }))


  http.get('/search', respondWith(function (req) {
    var query = req.query.q
    if (query) {
      // search by address
      return search(query)
    }

    throw new Error('invalid search: no query specified')
  }))

  http.get('/homes/:id', respondWith(function (req) {
    var id = req.params.id
    return summaryView(id)
      .then(function (doc) {
        return JSON.stringify(doc)
      })
  }))

  http.get('/homes/:id/violations', respondWith(function (req) {
    var id = req.params.id
    return codeViolationsView(id)
      .then(function (doc) {
        return JSON.stringify(doc)
      })
  }))

  http.get('/landlords/:id', respondWith(function (req) {
    var id = req.params.id

    return landlordView(id)
      .then(function (doc) {
        return JSON.stringify(doc)
      })
  }))

  http.post('/comments', jsonBody, respondWith(function (req) {
    // strip html from user input:
    var body = funderscore.map(req.body, html2plaintext)
    // stub username for comments:
    body.user = 'user'
    return comments.post(body)
      .then(function () {
        return 201
      })
  }))

  return new Promise(function (resolve, reject) {
    http.listen(config.port, function (err) {
      if (err) { return reject(err) }
      console.log('listening on ' + config.rootUrl)
      resolve()
    })
  })

}

function jsonBody (req, res, next) {
  JSONBody(req, res, function (err, body) {
    if (err) {
      err.code = 400
      return next(err)
    }

    req.body = body
    next()
  })
}

function startsWith(q) {
  // unsafe, should escape regex chars + check for slow regexps
  return new RegExp('^' + q)
}
