// Testing the Apartment Unit Model
const Remark = require('../../lib/models/remark');
const assert = require('chai').assert;

describe('Validate Remark model', () => {
  
  it('Validation with all properties', done => {
    const newRemark = new Remark({
      text: 'test remark text field',
      threadId: '581d1eee6823e51ab3d78fbe',
      userId: '581d1eee6823e51ab3d78fbe',
      parentRemId: '581d1eee6823e51ab3d78fbe'
    });

    newRemark.validate(err => {
      if (!err) done();
      else done(err);
    });
  });

  it('Validation with all required properties', done => {
    const newRemark = new Remark({
      text: 'test remark text field',
      threadId: '581d1eee6823e51ab3d78fbe',
      userId: '581d1eee6823e51ab3d78fbe'
    });

    newRemark.validate(err => {
      if (!err) done();
      else done(err);
    });
  });

  it('Validation with missing text', done => {
    const newRemark = new Remark({
      threadId: '581d1eee6823e51ab3d78fbe',
      userId: '581d1eee6823e51ab3d78fbe'
    });

    newRemark.validate(err => {
      assert.isOk(err, 'text should be required');
      done();
    });
  });

  it('Validation with missing threadId', done => {
    const newRemark = new Remark({
      text: 'suppplied text',
      userId: '581d1eee6823e51ab3d78fbe'
    });

    newRemark.validate(err => {
      assert.isOk(err, 'ThreadId should be required');
      done();
    });
  });

  it('Validation with missing userId', done => {
    const newRemark = new Remark({
      text: 'suppplied text',
      threadId: '581d1eee6823e51ab3d78fbe'
    });

    newRemark.validate(err => {
      assert.isOk(err, 'UserId should be required');
      done();
    });
  });


});
