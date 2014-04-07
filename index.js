var mach = require('mach')

var app = mach.stack()

app.get('/', function (req) {
  return "hey sup"
})

mach.serve(app, 9001)