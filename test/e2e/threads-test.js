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

  it('GET all without token', done => {
    request
      .get('/api/threads')
      .then( res => done( 'status should not be 200' ) )
      .catch( res => {
        assert.equal( res.status, 400 );
        assert.equal( res.response.body.error, 'unauthorized, no token provided' );
        done();
      });
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
