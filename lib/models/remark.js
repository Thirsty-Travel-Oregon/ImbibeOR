const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  text: {
    type: String,
    required: true
  },
  threadId: {
    type: Schema.Types.ObjectId,
    ref: 'Thread',
    required: true
  },
  parentRemId: {
    type: Schema.Types.ObjectId,
    ref: 'Remark'
  },
  userId: {
    type: Schema.Types.Object,
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

module.exports = mongoose.model('Remark', schema);