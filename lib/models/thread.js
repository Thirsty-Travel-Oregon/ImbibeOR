const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: false
  },
  drinkType: {
    type: String,
    required: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Thread', schema);