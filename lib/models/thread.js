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
    required: true
  },
  drinkType: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: {
    type: String
  }
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Thread', schema);