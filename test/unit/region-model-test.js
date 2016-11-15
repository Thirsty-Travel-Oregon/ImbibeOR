// Testing the Apartment Unit Model
const Region = require('../../lib/models/region');
const assert = require('chai').assert;

describe('Validate Region model', () => {
  
  it('Validation with all properties', done => {
    const newRegion = new Region({
      region: 'test region'
    });

    newRegion.validate(err => {
      if (!err) done();
      else done(err);
    });
  });

  it('Validation with missing region', done => {
    const newRegion = new Region({
    });

    newRegion.validate(err => {
      assert.isOk(err, 'region should be required');
      done();
    });
  });

});
