// data is stored on the home object like so:
// home {
//   data: {
//     effective: {
//       [rel]: value : String
//     },
//     history: [
//       {rel: String, value: String, timestamp: Number, user: String}
//     ]
//   }
// }



module.exports = function (db) {

  // (homeId: String, rel: String, value: String, user: String) => Promise
  function save(homeId, rel, value, user) {
    var timestamp = Date.now()
    var update = {$set: {}, $push:{}}
    update.$set['data.effective.'+rel] = value
    update.$push['data.history'] = {
      rel: rel, value: value, timestamp: timestamp, user: user
    }

    return db.homes.where({_id: homeId})
            .update(update)
  }

  return {save: save}
}