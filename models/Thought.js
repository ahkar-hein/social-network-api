const mongoose = require('mongoose');

// create new mongoose schema for thought
const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1, 
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    required: true,
    ref: 'user' //foriegn key associated for user
  },
  reactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'reaction' // reaction that associated from reaction model
    }
  ]
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});

// create virtual count for reation count 
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// create model for thought
const Thought = mongoose.model('thought', thoughtSchema);

module.exports = Thought;
