module.exports = function (db) {
  
  function post (comment) {
    ensure(comment, 'No comment')
    var date = Date.now()
    var subject = ensure(comment.subject, 'No subject')
    var name = ensure(comment.name, 'No name')
    var user = ensure(comment.user, 'No user')
    var body = ensure(comment.body, 'No body')

    return db.comments.insert({
      date: date,
      subject: subject,
      name: name,
      user: user,
      body: body
    })
  }

  function getBySubject(subject) {
    return db.comments
      .where({subject: subject})
  }

  return {
    post: post,
    getBySubject: getBySubject
  }
}

function ensure(val, errMsg) {
  if (!val) {
    var e = new Error(errMsg || 'Missing value')
        e.code = 400
        throw e
  }
  return val
}