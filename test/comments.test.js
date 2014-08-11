var chai = require('mochi')
expect = chai.expect

describe('comments', function () {
  var Comments = require('../comments')

  describe('.post', function () {
    it('requires comment', function () {
      var comments = Comments({})
      expect(function () {
        comments.post()
      }).to.throw('No comment')
    })
    it('throws if no subject', function () {
      var comments = Comments({})
      expect(function () {
        comments.post({})
      }).to.throw('No subject')
    })
    it('throws if no name', function () {
      var comments = Comments({})
      expect(function () {
        comments.post({
          subject: 'foo'
        })
      }).to.throw('No name')
    })
    it('throws if no user', function () {
      var comments = Comments({})
      expect(function () {
        comments.post({
          subject: 'foo',
          name: 'name'
        })
      }).to.throw('No user')
    })
    it('throws if no body', function () {
      var comments = Comments({})
      expect(function () {
        comments.post({
          subject: 'foo',
          name: 'name',
          user: 'bar'
        })
      }).to.throw('No body')
    })
    it('sets date to now', function (done) {
      var comments = Comments({
        comments: {
          insert: function (comment) {
            comment.date.should.be.within(Date.now() - 10, Date.now())
            done()
          }
        }
      })
      comments.post({
        subject: 'foo',
        name: 'name',
        user: 'bar',
        body: 'hi'
      })
      
    })

  })

  describe('.getBySubject', function () {
    it('should get from db by subject', function (done) {
      var comments = Comments({
        comments: {
          where: function (search) {
            search.should.deep.equal({
              subject: 'homes/12'
            })
            done()
          }
        }
      })
    
      comments.getBySubject('homes/12')
      
    })
  })

})