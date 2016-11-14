const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const connection = require('../lib/setupMongoose');
const app = require('../lib/app');

describe('auth tests', () => {
  const req = chai.request(app);

  before(done => {
    const drop = () => connection.db.dropDatabse(done);
    if(connection.readyState === 1) drop();
    else connection.once('open', drop);
  });

  describe('denies unauthorized access to threads', () => {
    it('errors with 400 if not token present for POST', done => {
      req
        .post('/threads')
        //eslint-disable-next-line no-unused-vars
        .then(res => done('expected 200'))
        .catch(res => {
          assert.equal(res.status, 400);
          assert.equal(res.response.body, 'Unauthorized - No Token Provided');
          done();
        })
        .catch(done);
    });

    it('errors with 403 if token invalid for POST', done => {
      req
        .post('/threads')
        .set('authorization', 'Bearer badtoken')
        //eslint-disable-next-line no-unused-vars
        .then(res => done('expected 200'))
        .catch(res => {
          assert.equal(res.status, 403);
          assert.equal(res.response.body, 'Unauthorized - Invalid Token');
          done();
        })
        .catch(done);
    });

    it('errors with 400 if not token present for PUT', done => {
      req
        .put('/threads/id')
        //eslint-disable-next-line no-unused-vars
        .then(res => done('expected 200'))
        .catch(res => {
          assert.equal(res.status, 400);
          assert.equal(res.response.body, 'Unauthorized - No Token Provided');
          done();
        })
        .catch(done);
    });

    it('errors with 403 if token invalid for PUT', done => {
      req
        .put('/threads/id')
        .set('authorization', 'Bearer badtoken')
        //eslint-disable-next-line no-unused-vars
        .then(res => done('expected 200'))
        .catch(res => {
          assert.equal(res.status, 403);
          assert.equal(res.response.body, 'Unauthorized - Invalid Token');
          done();
        })
        .catch(done);
    });

    it('errors with 400 if not token present for DELETE', done => {
      req
        .del('/threads/id')
        // eslint-disable-next-line no-unused-vars
        .then(res => done('expected 200'))
        .catch(res => {
          assert.equal(res.status, 400);
          assert.equal(res.response.body, 'Unauthorized - No Token Provided');
          done();
        })
        .catch(done);
    });

    it('errors with 403 if token invalid for DELETE', done => {
      req
        .del('/threads/id')
        .set('authorization', 'Bearer badtoken')
        //eslint-disable-next-line no-unused-vars
        .then(res => done('expected 200'))
        .catch(res => {
          assert.equal(res.status, 403);
          assert.equal(res.response.body, 'Unauthorized - Invalid Token');
          done();
        })
        .catch(done);
    });
  })
})