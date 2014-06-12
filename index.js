var mach = require('mach')
var querystring = require('querystring')
require('polyfill-promise')
var db = require('./db')


var summaryView = require('./views/summaryView')

var app = mach.stack()

app.get('/', function (req) {
  return "hey sup"
})

function startsWith(q) {
  // unsafe, should escape regex chars + check for slow regexps
  return new RegExp('^' + q)
}

app.get('/search', function (req) {
  var params = querystring.parse(req.queryString)
  console.log(params)

  if (params.q) {
    // search by address
    return db.buildings.where({address: startsWith(params.q)})
      .then(function (docs) {
        return JSON.stringify({
          results: docs
        })
      })
  }

  throw new Error('invalid search')
})

app.get('/buildings/:id', function (req, id) {

  return summaryView(id)
    .then(function (doc) {
      return JSON.stringify(doc)
    })

})

console.log(app._app._routes)

mach.serve(app, process.env.PORT)