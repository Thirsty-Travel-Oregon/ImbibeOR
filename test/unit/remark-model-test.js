// Testing the Apartment Unit Model
const Remark = require('../../lib/models/remark');
const assert = require('chai').assert;

describe('Validate Remark model', () => {
  it('Validation with all properties', done => {
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

});
