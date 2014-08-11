require('polyfill-promise')

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
        res.send(e.code || 500, 'error')
        console.error('error:', e && e.stack ? e.stack : e)
      })
  }
}

module.exports = respondWith