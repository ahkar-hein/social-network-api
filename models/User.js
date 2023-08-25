const mongoose = require('mongoose');

// create mongoose schema for user
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'] //validate email format by using regex
  },
//   thought and friends that associated from thought and self associated from user
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  ]
});

// friend count virtual 
userSchema.virtual('friendCount', {
  get: function () {
    return this.friends.length;
  }
});

// create new model for users.
const User = mongoose.model('user', userSchema);

module.exports = User;
