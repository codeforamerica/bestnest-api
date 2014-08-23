var sinon = require('sinon')
require('mochi')
  .use(require('sinon-chai'))


var userGeneratedContent = require('../services/userGeneratedContent')

describe('services/userGeneratedContent', function () {
  describe('save', function () {
    it('saves comments in the db', function () {
      var db = {}
      db.homes = {}
      var update = sinon.spy()
      db.homes.where = sinon.stub().returns({
        update: update
      })

      userGeneratedContent(db).save('homeid', 'rel', 'value', 'user')

      db.homes.where
        .should.have.been.calledWith({_id: 'homeid'})
      
      update.should.have.been.calledOnce
      updateArg = update.firstCall.args[0]

      // set effective val
      updateArg.$set.should.deep.equal({'data.effective.rel': 'value'})
      
      // add history
      updateArg.$push['data.history'].rel.should.equal('rel')
      updateArg.$push['data.history'].value.should.equal('value')
      updateArg.$push['data.history'].user.should.equal('user')
      updateArg.$push['data.history'].timestamp.should.be.within(Date.now()-10, Date.now())
      
    })
  })
})