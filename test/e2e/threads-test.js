const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index.js');
const User = require('../../lib/models/user');
const assert = chai.assert;
chai.use(chaiHttp);

// load test env variables
const path = require('path');
require('dotenv').load({silent: true, path: path.join(__dirname, '../../test/.env.test') });

const connection = require('../../lib/mongoose-config');
const app = require('../../lib/app');

describe('Thread Tests: ', () => {
  const request = chai.request(app);

  before( done => {
    const CONNECTED = 1;
    if (connection.readyState === CONNECTED) dropCollection();
    else connection.on('open', dropCollection);

    function dropCollection(){
      const name = 'threads';
      connection.db
        .listCollections({ name })
        .next( (err, collinfo) => {
          if (!collinfo) return done();
          connection.db.dropCollection(name, done);
        });
    }
  });

  const userAdmin = {
    username: 'TestAdmin',
    password: 'AdminPWD',
    roles: ['admin']
  };

  const userModerator = {
    username: 'TestModerator',
    password: 'ModeratorPWD',
    roles: ['moderator']
  };

  const userBasic = {
    username: 'TestBasic',
    password: 'BasicPWD',
    roles: ['basic']
  };

  let tokenAdmin = '',
    tokenModerator = '',
    tokenBasic = '';

  before( done => {
    request
      .post( '/api/auth/signup' )
      .send( userAdmin )
      .then( res => {
        assert.ok( tokenAdmin = res.body.token );
        assert.ok(userAdmin.userId = res.body.userId);
        done();
      })
      .catch(done);
  });

  before( done => {
    console.log('get the Admin user Id');
    User.find({username: userAdmin.username})
      .then(user => assert.ok(userAdmin.userId = user[0]._id))
      .then(done)
      .catch(done);
  });

  before( done => {
    request
      .post( '/api/auth/signup' )
      .send( userModerator )
      .then( res => assert.ok( tokenModerator = res.body.token ) )
      .then( done )
      .catch(done);
  });

  before( done => {
    console.log('get the Moderator user Id');
    User.find({username: userModerator.username})
      .then(user => assert.ok(userModerator.userId = user[0]._id))
      .then(done)
      .catch(done);
  });

  before( done => {
    request
      .post( '/api/auth/signup' )
      .send( userBasic )
      .then( res => assert.ok( tokenBasic = res.body.token ) )
      .then( done )
      .catch(done);
  });

  before( done => {
    console.log('get the Basic user Id');
    User.find({username: userBasic.username})
      .then(user => assert.ok(userBasic.userId = user[0]._id))
      .then(done)
      .catch(done);
  });

  it('GET all without token', done => {
    request
      .get('/api/threads')
      .then( res => {
        assert.deepEqual(res.body, []);
        done();
      })
      .catch(done);
  });

  it('GET all with token', done => {
    request
      .get('/api/threads')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .then( res => {
        assert.deepEqual(res.body, []);
        done();
      })
      .catch(done);
  });

  const testThread = {
    title: 'THREAD TITLE',
    text: 'New test thread text',
    region: 'Central',
    drinkType: 'Wine',
    userId: '582b5ac520750021b63b7933'
  };

  const testThreadUpd = {
    text: 'Updated thread text'
  };

  it('POST request no token', done => {
    request
      .post('/api/threads')
      .set('Authorization', 'Bearer XXX')
      .send(testThread)
      .then(res => done( 'status should not be 200' ) )
      .catch( res => {
        assert.equal( res.status, 403 );
        assert.equal( res.response.body.error, 'Unauthorized - Invalid Token' );
        done();
      });
  });

  it('POST request valid token', done => {
    testThread.userId = userBasic.userId;
    request
      .post('/api/threads')
      .set('Authorization', `Bearer ${tokenBasic}`)
      .send(testThread)
      .then(res => {
        const thread = res.body;
        assert.ok(thread._id);
        testThread._id = thread._id;
        testThread.__v = 0;
        testThread.createdAt = thread.createdAt;
        testThread.updatedAt = thread.updatedAt;
        testThread.userId = thread.userId;
        done();
      })
      .catch(done);
  });

  it('GET all after POST', done => {
    request
      .get('/api/threads')
      .set('Authorization', `Bearer ${tokenBasic}`)
      .then( res => {
        assert.deepEqual(res.body, [testThread]);
        done();
      })
      .catch(done);
  });

  it('PUT request - invalid token', done => {
    request
      .put(`/api/threads/${testThread._id}`)
      .set('Authorization', 'Bearer XXX')
      .send(testThreadUpd)
      .then(res => done( 'status should not be 200' ) )
      .catch( res => {
        assert.equal( res.status, 403 );
        assert.equal( res.response.body.error, 'Unauthorized - Invalid Token' );
        done();
      });
  });

  it('PUT request - valid token', done => {
    request
      .put(`/api/threads/${testThread._id}`)
      .set('Authorization', `Bearer ${tokenBasic}`)
      .send(testThreadUpd)
      .then(res => {
        assert.deepEqual(res.body, testThread);
        testThread.text = testThreadUpd.text;
        done();
      })
      .catch(done);
  });

  it('GET by id', done => {
    request
      .get(`/api/threads/${testThread._id}`)
      .set('Authorization', `Bearer ${tokenBasic}`)
      .then( res => {
        // CANNOT use the deepEqual as the updatedAt field changes due to the prior PUT
        // assert.deepEqual(res.body, testThread);
        assert.equal(res.body._id, testThread._id);
        assert.equal(res.body._v, testThread._v);
        assert.equal(res.body.title, testThread.title);
        assert.equal(res.body.text, testThread.text);
        assert.equal(res.body.region, testThread.region);
        assert.equal(res.body.drinkType, testThread.drinkType);
        assert.equal(res.body.userId, testThread.userId);
        assert.equal(res.body.createdAt, testThread.createdAt);
        done();
      })
      .catch(done);
  });

  it('DELETE request - invalid token', done => {
    request
      .delete(`/api/threads/${testThread._id}`)
      .set('Authorization', 'Bearer XXX')
      .then(res => done( 'status should not be 200' ) )
      .catch(res => {
        assert.equal( res.status, 403 );
        assert.equal( res.response.body.error, 'Unauthorized - Invalid Token' );
        done();
      });
  });

  it('DELETE request - valid token', done => {
    request
      .delete(`/api/threads/${testThread._id}`)
      .set('Authorization', `Bearer ${tokenBasic}`)
      .then(res => {
        // CANNOT use the deepEqual as the updatedAt field changes due to the prior PUT
        // assert.deepEqual(res.body, testThread);
        assert.equal(res.body._id, testThread._id);
        assert.equal(res.body._v, testThread._v);
        assert.equal(res.body.title, testThread.title);
        assert.equal(res.body.text, testThread.text);
        assert.equal(res.body.region, testThread.region);
        assert.equal(res.body.drinkType, testThread.drinkType);
        assert.equal(res.body.userId, testThread.userId);
        assert.equal(res.body.createdAt, testThread.createdAt);
        done();
      })
      .catch(done);
  });


});
