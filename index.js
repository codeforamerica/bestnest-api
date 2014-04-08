var mach = require('mach')

var app = mach.stack()

app.get('/', function (req) {
  return "hey sup"
})

console.log(app._app._routes)

mach.serve(app, process.env.PORT)