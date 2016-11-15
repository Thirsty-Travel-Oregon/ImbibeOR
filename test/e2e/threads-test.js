const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index.js');
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
    username: 'Test Admin',
    password: 'AdminPWD',
    roles: ['admin']
  };

  const userModerator = {
    username: 'Test Moderator',
    password: 'ModeratorPWD',
    roles: ['moderator']
  };

  const userBasic = {
    username: 'Test Basic',
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
      .then( res => assert.ok( tokenAdmin = res.body.token ))
      .then( done )
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
    request
      .post( '/api/auth/signup' )
      .send( userBasic )
      .then( res => assert.ok( tokenBasic = res.body.token ) )
      .then( done )
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


});
