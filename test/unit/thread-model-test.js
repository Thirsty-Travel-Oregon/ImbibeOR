// Testing the Apartment Unit Model
const Thread = require('../../lib/models/thread');
const assert = require('chai').assert;

describe('Validate Thread model', () => {
  
  it('Validation with all properties', done => {
    const newThread = new Thread({
      title: 'THREAD TITLE',
      text: 'test remark text field',
      region: 'Central',
      drinkType: 'Wine',
      userId: '581d1eee6823e51ab3d78fbe'
    });

    newThread.validate(err => {
      if (!err) done();
      else done(err);
    });
  });

  it('Validation with missing title', done => {
    const newThread = new Thread({
      text: 'test remark text field',
      region: 'Central',
      drinkType: 'Wine',
      userId: '581d1eee6823e51ab3d78fbe'
    });

    newThread.validate(err => {
      assert.isOk(err, 'Title should be required');
      done();
    });
  });

  it('Validation with missing text', done => {
    const newThread = new Thread({
      title: 'THREAD TITLE',
      region: 'Central',
      drinkType: 'Wine',
      userId: '581d1eee6823e51ab3d78fbe'
    });

    newThread.validate(err => {
      assert.isOk(err, 'Text should be required');
      done();
    });
  });

  it('Validation with missing region', done => {
    const newThread = new Thread({
      title: 'THREAD TITLE',
      text: 'test remark text field',
      drinkType: 'Wine',
      userId: '581d1eee6823e51ab3d78fbe'
    });

    newThread.validate(err => {
      assert.isOk(err, 'Region should be required');
      done();
    });
  });

  it('Validation with missing drinkType', done => {
    const newThread = new Thread({
      title: 'THREAD TITLE',
      text: 'test remark text field',
      region: 'Central',
      userId: '581d1eee6823e51ab3d78fbe'
    });

    newThread.validate(err => {
      assert.isOk(err, 'Drink Type should be required');
      done();
    });
  });

  it('Validation with missing userId', done => {
    const newThread = new Thread({
      title: 'THREAD TITLE',
      text: 'test remark text field',
      region: 'Central',
      drinkType: 'Wine'
    });

    newThread.validate(err => {
      assert.isOk(err, 'UserId should be required');
      done();
    });
  });

});
