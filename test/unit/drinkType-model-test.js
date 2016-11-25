// Testing the Apartment Unit Model WAT? Dead comments kill kittens...
const DrinkType = require('../../lib/models/drinkType');
const assert = require('chai').assert;

describe('Validate DrinkType model', () => {
  
  it('Validation with all properties', done => {
    const newDrinkType = new DrinkType({
      drinkType: 'test drinktype'
    });
    
    newDrinkType.validate(done);
  });

  it('Validation with missing drinkType', done => {
    const newDrinkType = new DrinkType();

    newDrinkType.validate(err => {
      assert.isOk(err, 'drinkType should be required');
      done();
    });
  });

});
