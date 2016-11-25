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

  // DRY! (Don't Repeat Yourself)
  function checkError(req, token, errorCode, errorMessage, done) {
    req
        .set('authorization', token)
        .then(res => done('200 not expected'))
        .catch(res => {
          assert.equal(res.status, errorCode);
          assert.equal(res.response.body.error, errorMessage);
          done();
        });
  }

  function checkPostError(url, token, errorCode, errorMessage, done) {
    checkError(req.post(url), token, errorCode, errorMessage, done);
  }

  function checkPutError(url, token, errorCode, errorMessage, done) {
    checkError(req.put(url), token, errorCode, errorMessage, done);
  }

  function checkDeleteError(url, token, errorCode, errorMessage, done) {
    checkError(req.del(url), token, errorCode, errorMessage, done);
  }

  const emptyToken = '';
  const badToken = 'Bearer badtoken';
  const noTokenMessage = 'Unauthorized - No Token Provided';
  const invalidTokenMessage = 'Unauthorized - Invalid Token';

  // Moar DRY
  function testAuth(resource) {
    describe(`denies unauthorized access to ${resource}`, () => {

      const url = `/api/${resource}`;
      const urlForId = `${url}/id`;

      it('errors with 400 if not token present for thread POST', done => {
        checkPostError(url, emptyToken, 400, noTokenMessage, done);
      });

      it('errors with 403 if token invalid for thread POST', done => {
        checkPostError(url, badToken, 403, invalidTokenMessage, done);
      });

      it('errors with 400 if not token present for thread PUT', done => {
        checkPutError(urlForId, emptyToken, 400, noTokenMessage, done);
      });

      it('errors with 403 if token invalid for thread PUT', done => {
        checkPutError(urlForId, badToken, 403, invalidTokenMessage, done);
      });

      it('errors with 400 if not token present for thread DELETE', done => {
        checkDeleteError(urlForId, emptyToken, 400, noTokenMessage, done);
      });

      it('errors with 403 if token invalid for thread DELETE', done => {
        checkDeleteError(urlForId, badToken, 403, invalidTokenMessage, done);
      });
    });
  }

  testAuth('threads');
  testAuth('remarks');
  
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