const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true,
    ref: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},);

const Reaction = mongoose.model('reaction', reactionSchema);

module.exports = Reaction;
