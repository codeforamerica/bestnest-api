require('polyfill-promise')
require('./db')(require('./config')).then(function (db) {
  db = db.store._db
  var index = P.call(db, db.ensureIndex)
  
  return Promise.all([
  , index('parcelOwners', {'parcelId':1})  
  , index('parcelOwners', {'owner1':1})
  , index('codeViolations', {'home.properties.full':1})
  , index('homes', {'properties.parcel':1})
  , index('homes', {'properties.full':1})
  , index('comments', {'subject':1})
  ])
})
.then(function () {
  console.log('indexes!')
}, console.error)
.then(process.exit)


var P = function (f) {
  var c = this
  return function () {
    var args = arguments
    return new Promise(function (resolve, reject) {
      args = [].slice.call(args).concat(function (err, v) {
        if (err) { return reject(err) }
        resolve(v)
      })
      f.apply(c, args)
    })
  }
}