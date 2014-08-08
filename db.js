var minq = require('minq')

module.exports = function (config) {
  return minq.connect(config.dbConnStr)
}

// // mock db
// var db = {
//   buildings: {
//     byId: function (id) {
//       return Promise.cast({
//         id: id,
//         address: '23 sdfsfs strasse',
//         type: 'Single Family Home',
//         rating: 'ok',
//         energy: {
//           cost: 'hella dollars'
//         },
//         violations: {
//           count: 4,
//           items: [
//             {label: 'Window Screens Not Installed', date: 2323434434232},
//             {label: 'Litter in Yard', date: 2323434434232},
//             {label: 'Inadequate insulation', date: 2323434434232},
//             {label: 'Broken Heater', date: 2323434434232},
//           ]  
//         },
//         owner: {
//           name: 'yeah right',
//           address: 'good luck',
//           email: 'ha!'
//         }
//       })
//     },
//     where: function (predicate) {
//       return Promise.cast([
//         {id: '3', address: '23 dsfds strasse'}
//       ])
//     }
//   }
// }

// module.exports = db