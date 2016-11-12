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
    type: Schema.Types.ObjectId,
    ref: 'Thread'
  },
  parentRemId: {
    type: Schema.Types.ObjectId,
    ref: 'Remark'
  }
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Remark', schema);