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

  const testFollows = {
    username: 'testFollows',
    password: 'testPWD',
    roles: ['basic']
  };
  
  let followsToken = '';

  const followsUser = {
    userId: ''
  };

  const followsThread = {
    threadId: ''
  };

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
  });

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


  before(done => {
    req
      .post('/api/auth/signup')
      .send(testFollows)
      .then(res => {
        assert.isOk(testFollows._id = res.body.userId);
        assert.isOk(followsToken = res.body.token);
      })
      .then(done)
      .catch(done);
  });

  it('GET all users', done => {
    req
      .get('/api/users')
      .set('authorization', `Bearer ${adminToken}`)
      .then(res => {
        expect(res.body).lengthOf(3);
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

  it('FOLLOW User', done => {
    followsUser.userId = testUser._id;
    req
      .put(`/api/users/followUser/${testFollows._id}`)
      .set('Authorization', `Bearer ${followsToken}`)
      .send(followsUser)
      .then(res => {
        assert.isOk(res.body.ok, 'Update succeeded');
        testFollows.usersFollowed = [];
        testFollows.usersFollowed.push(testUser._id.toString());
        done();
      })
      .catch(done);
  });


  it('FOLLOW User2', done => {
    followsUser.userId = testAdmin._id;
    req
      .put(`/api/users/followUser/${testFollows._id}`)
      .set('Authorization', `Bearer ${followsToken}`)
      .send(followsUser)
      .then(res => {
        assert.isOk(res.body.ok, 'Update succeeded');
        testFollows.usersFollowed.push(testAdmin._id.toString());
        done();
      })
      .catch(done);
  });

  it('FOLLOW User 1 again', done => {
    followsUser.userId = testUser._id;
    req
      .put(`/api/users/followUser/${testFollows._id}`)
      .set('Authorization', `Bearer ${followsToken}`)
      .send(followsUser)
      .then(res => {
        assert.isOk(res.body, 'Update succeeded');
        done();
      })
      .catch(done);
  });

  it('FOLLOW Thread 1', done => {
    followsThread.threadId = testUser._id;
    req
      .put(`/api/users/followThread/${testFollows._id}`)
      .set('Authorization', `Bearer ${followsToken}`)
      .send(followsThread)
      .then(res => {
        assert.isOk(res.body.ok, 'Update succeeded');
        testFollows.threadsFollowed = [];
        testFollows.threadsFollowed.push(testUser._id.toString());
        done();
      })
      .catch(done);
  });

  it('FOLLOW Thread 2', done => {
    followsThread.threadId = testAdmin._id;
    req
      .put(`/api/users/followThread/${testFollows._id}`)
      .set('Authorization', `Bearer ${followsToken}`)
      .send(followsThread)
      .then(res => {
        assert.isOk(res.body.ok, 'Update succeeded');
        testFollows.threadsFollowed.push(testAdmin._id.toString());
        done();
      })
      .catch(done);
  });

  it('FOLLOW Thread 1 Again', done => {
    followsThread.threadId = testUser._id;
    req
      .put(`/api/users/followThread/${testFollows._id}`)
      .set('Authorization', `Bearer ${followsToken}`)
      .send(followsThread)
      .then(res => {
        assert.isOk(res.body, 'Update succeeded');
        done();
      })
      .catch(done);
  });

  it('GET single user', done => {
    req
      .get(`/api/users/${testFollows._id}`)
      .set('authorization', `Bearer ${adminToken}`)
      .then(res => {
        assert.equal(res.body._id, testFollows._id);
        expect(res.body.usersFollowed).lengthOf(2);
        assert.equal(res.body.usersFollowed[0], testFollows.usersFollowed[0]);
        assert.equal(res.body.usersFollowed[1], testFollows.usersFollowed[1]);
        expect(res.body.threadsFollowed).lengthOf(2);
        assert.equal(res.body.threadsFollowed[0], testFollows.threadsFollowed[0]);
        assert.equal(res.body.threadsFollowed[1], testFollows.threadsFollowed[1]);
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
  });
});