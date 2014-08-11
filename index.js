require('newrelic')

var nali = require('nali')('bestnest-api')

nali.registerInstance('config', require('./config'))
nali.registerService('db', require('./db'))
nali.registerService('search', require('./search'))
nali.registerService('http', require('./http'))

nali.registerService('summaryView', require('./views/summary'))
nali.registerService('landlordView', require('./views/landlord'))
nali.registerService('codeViolationsView', require('./views/codeViolations'))
nali.registerService('comments', require('./comments'))


nali.resolve('http').then(function (http) {
  console.log('bestnest-api started')
})
