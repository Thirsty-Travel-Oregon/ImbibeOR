// Testing the Apartment Unit Model
const User = require('../../lib/models/user');
const assert = require('chai').assert;

describe('Validate User model', () => {
  
  it('Validation with all properties', done => {
    const newUser = new User({
      name: 'test name for user',
      username: 'userName',
      password: 'testPassword',
      email: 'testEmail@email.fake',
      usersFollowed: ['581d1eee6823e51ab3d78fbe','581d1eee6823e51ab3d78fbe'],
      threadsFollowed: ['581d1eee6823e51ab3d78fbe','581d1eee6823e51ab3d78fbe'],
      roles: ['none']
    });

    newUser.validate(err => {
      if (!err) done();
      else done(err);
    });
  });

  it('Validation with only required properties', done => {
    const newUser = new User({
      username: 'userName',
      password: 'testPassword'
    });

    newUser.validate(err => {
      if (!err) done();
      else done(err);
    });
  });

  it('Validation with missing userName', done => {
    const newUser = new User({
      name: 'test name for user',
      password: 'testPassword',
      email: 'testEmail@email.fake',
      usersFollowed: ['581d1eee6823e51ab3d78fbe','581d1eee6823e51ab3d78fbe'],
      threadsFollowed: ['581d1eee6823e51ab3d78fbe','581d1eee6823e51ab3d78fbe'],
      roles: ['none']
    });

    newUser.validate(err => {
      assert.isOk(err, 'region should be required');
      done();
    });
  });

  it('Validation with missing password', done => {
    const newUser = new User({
      name: 'test name for user',
      username: 'userName',
      email: 'testEmail@email.fake',
      usersFollowed: ['581d1eee6823e51ab3d78fbe','581d1eee6823e51ab3d78fbe'],
      threadsFollowed: ['581d1eee6823e51ab3d78fbe','581d1eee6823e51ab3d78fbe'],
      roles: ['none']
    });

    newUser.validate(err => {
      assert.isOk(err, 'region should be required');
      done();
    });
  });

});
