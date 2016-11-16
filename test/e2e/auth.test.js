const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const path = require('path');
require('dotenv').load({path: path.join(__dirname, '../.env.test')});
const connection = require('../../lib/mongoose-config');
const app = require('../../lib/app');


describe('auth tests', () => {
  const req = chai.request(app);

  before(done => {
    const drop = () => connection.db.dropDatabase(done);
    if(connection.readyState === 1) drop();
    else connection.once('open', drop);
  });

  describe('denies unauthorized access to threads', () => {

    function checkPostError(url, token, errorCode, errorMessage, done) {
      req
          .post(url)
          .set('authorization', token)
          .then(res => done('200 not expected'))
          .catch(res => {
            assert.equal(res.status, errorCode);
            assert.equal(res.response.body.error, errorMessage);
            done();
          });
    }

    function checkPutError(url, token, errorCode, errorMessage, done) {
      req
          .put(url)
          .set('authorization', token)
          .then(res => done('200 not expected'))
          .catch(res => {
            assert.equal(res.status, errorCode);
            assert.equal(res.response.body.error, errorMessage);
            done();
          });
    }

    function checkDeleteError(url, token, errorCode, errorMessage, done) {
      req
          .del(url)
          .set('authorization', token)
          .then(res => done('200 not expected'))
          .catch(res => {
            assert.equal(res.status, errorCode);
            assert.equal(res.response.body.error, errorMessage);
            done();
          });
    }

    const threadMain = '/api/threads';
    const threadId = '/api/threads/id';
    const emptyToken = '';
    const badToken = 'Bearer badtoken';
    const noTokenMessage = 'Unauthorized - No Token Provided';
    const invalidTokenMessage = 'Unauthorized - Invalid Token';

    it('errors with 400 if not token present for POST', done => {
      checkPostError(threadMain, emptyToken, 400, noTokenMessage, done);
    });

    it('errors with 403 if token invalid for POST', done => {
      checkPostError(threadMain, badToken, 403, invalidTokenMessage, done);
    });

    it('errors with 400 if not token present for PUT', done => {
      checkPutError(threadId, emptyToken, 400, noTokenMessage, done);
    });

    it('errors with 403 if token invalid for PUT', done => {
      checkPutError(threadId, badToken, 403, invalidTokenMessage, done);
    });

    it('errors with 400 if not token present for DELETE', done => {
      checkDeleteError(threadId, emptyToken, 400, noTokenMessage, done);
    });

    it('errors with 403 if token invalid for DELETE', done => {
      checkDeleteError(threadId, badToken, 403, invalidTokenMessage, done);
    });
  });

  describe('user signup and login', () => {

    function badRequest(url, userData, error, done) {
      req
        .post(url)
        .send(userData)
        .then(res => done('200 not expected'))
        .catch(res => {
          assert.equal(res.status, 400);
          assert.equal(res.response.body.error, error);
          done();
        });
    }

    it('requires username at signup', done => {
      badRequest('/api/auth/signup', {password: 'password'}, 'username and password are required', done);
    });

    it('requires password at signup', done => {
      badRequest('/api/auth/signup', {username: 'username'}, 'username and password are required', done);
    });

    const testUser = {
      username: 'username',
      password: 'password'
    };

    let token = '';

    it('signs a user up', done => {
      req
        .post('/api/auth/signup')
        .send(testUser)
        .then(res => {
          token = res.body.token;
          req
            .post('/api/auth/validate')
            .set('authorization', `Bearer ${token}`)
            .then(res => {
              assert.isOk(res.body.valid);
              done();
            })
            .catch();
        });
    });

    it('prevents duplicate usernames', done => {
      badRequest('/api/auth/signup', testUser, 'username username already exists', done);
    });

    it('signs a user in', done => {
      req
        .post('/api/auth/signin')
        .send(testUser)
        .then(res => {
          req
            .post('/api/auth/validate')
            .set('authorization', `Bearer ${token}`)
            .then(res => {
              assert.isOk(res.body.valid);
              done();
            })
            .catch(done);
        });
    });
  });
});