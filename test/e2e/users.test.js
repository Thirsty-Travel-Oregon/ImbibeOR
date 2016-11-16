const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require('../../lib/models/user');
const assert = chai.assert;
const expect = chai.expect;
chai.use(chaiHttp);
const path = require('path');
require('dotenv').load({path: path.join(__dirname, '../.env.test')});
const connection = require('../../lib/mongoose-config');
const app = require('../../lib/app');


describe('user routing', () => {
  const req = chai.request(app);

  before(done => {
    const drop = () => connection.db.dropDatabase(done);
    if(connection.readyState === 1) drop();
    else connection.once('open', drop);
  });

  function getUserId(user, done) {
    User.find({username: user.username})
      .then(res => {
        user._id = res[0]._id;
        console.log('user', user);
        done();
      })
      .catch(done);
  }

  const testAdmin = {
    username: 'testAdmin',
    password: 'testAdmin',
    roles: ['admin']
  };

  const testMod = {
    username: 'testMod',
    password: 'testMod',
    roles: ['moderator']
  };

  const exTestMod = {
    roles: []
  };

  const testUser = {
    username: 'testUser',
    password: 'testUser'
  };

  let adminToken, modToken, userToken = '';

  // function makeUser(user, token, done) {
  //   req
  //     .post('/api/auth/signup')
  //     .send(user)
  //     .then(res => {
  //       assert.isOk(user._id = res.body.userId);
  //       assert.isOk(token = res.body.token);
  //     })
  //     .then(done)
  //     .catch(done);
  // };

  before(done => {
    req
      .post('/api/auth/signup')
      .send(testAdmin)
      .then(res => {
        assert.isOk(testAdmin._id = res.body.userId);
        assert.isOk(adminToken = res.body.token);
      })
      .then(done)
      .catch(done);
    // makeUser(testAdmin, adminToken, done);
  });

  // before(done => {
  //   req
  //     .post('/api/auth/signup')
  //     .send(testMod)
  //     .then(res => {
  //       assert.isOk(testMod._id = res.body.userId);
  //       assert.isOk(modToken = res.body.token);
  //     })
  //     .then(done)
  //     .catch(done);
  // });

  before(done => {
    req
      .post('/api/auth/signup')
      .send(testUser)
      .then(res => {
        assert.isOk(testUser._id = res.body.userId);
        assert.isOk(userToken = res.body.token);
      })
      .then(done)
      .catch(done);
  });

  it('GET all users', done => {
    req
      .get('/api/users')
      .set('authorization', `Bearer ${adminToken}`)
      .then(res => {
        expect(res.body).lengthOf(2);
        done();
      })
      .catch(done);
  });

  it('GET single user', done => {
    req
      .get(`/api/users/${testUser._id}`)
      .set('authorization', `Bearer ${adminToken}`)
      .then(res => {
        const user = res.body;
        assert.equal(user._id, testUser._id);
        assert.equal(user.username, testUser.username);
        done();
      })
      .catch(done);
  });

  it('DELETE single user', done => {
    req
      .del(`/api/users/${testUser._id}`)
      .set('authorization', `Bearer ${adminToken}`)
      .then(res => {
        const user = res.body;
        assert.equal(user._id, testUser._id);
        assert.equal(user.username, testUser.username);
        done();
      })
      .catch(done);
  });

  it('POST a new user', done => {
    req
      .post('/api/users')
      .set('authorization', `Bearer ${adminToken}`)
      .send(testMod)
      .then(res => {
        const user = res.body;
        assert.equal(user.username, testMod.username);
        assert.equal(user.password, testMod.password);
        assert.deepEqual(user.roles, testMod.roles);
        testMod._id = user._id;
        testMod.__v = user.__v;
        testMod.threadsFollowed = user.threadsFollowed;
        testMod.usersFollowed = user.usersFollowed;
        done();
      })
      .catch(done);
  });

  it('edits a current user PUT', done => {
    req
      .put(`/api/users/${testMod._id}`)
      .set('authorization', `Bearer ${adminToken}`)
      .send(exTestMod)
      .then(res => {
        const user = res.body;
        assert.deepEqual(user, testMod);
        expect(user.roles).lengthOf(1);
        done();
      })
      .catch(done);
  })
});