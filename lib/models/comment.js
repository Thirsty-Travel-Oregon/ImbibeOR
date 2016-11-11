const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  title: {
    type: String,
    required: false
  },
  text: {
    type: String,
    required: true
  },
  threadId: {
    type: [Schema.Types.ObjectId],
    ref: 'Thread'
  },
  parentCommId: {
    type: [Schema.Types.ObjectId],
    ref: 'Comment'
  }
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Comment', schema);