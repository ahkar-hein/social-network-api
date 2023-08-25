const mongoose = require('mongoose');

// create new mongoose schema for reaction
const reactionSchema = new mongoose.Schema({
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280 //validate for max string length as 280
  },
  username: {
    type: String,
    required: true,
    ref: 'user' // username associated with user
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},);

// create mongoose model
const Reaction = mongoose.model('reaction', reactionSchema);

module.exports = Reaction;
