const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  drinkType: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('DrinkType', schema);