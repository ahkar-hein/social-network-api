const connection = require('../config/connection');
const mongoose = require('mongoose'); 
const { User, Thought, Reaction } = require('../models');

connection.on('error', (err) => console.error(err)); 

connection.once('open', async () => {
  console.log('connected');

  const seedData = async () => {
    try {
      
      const users = await User.create([
        { username: 'Ahkar', email: 'ahkar@example.com' },
        { username: 'Hein', email: 'hein@example.com' },
      ]);

      
      const thoughts = await Thought.create([
        {
          thoughtText: 'This is my thought .... ',
          username: users[0].username,
          userId: users[0]._id,
        },
        {
          thoughtText: 'That is my idea',
          username: users[1].username,
          userId: users[1]._id,
        },
        
      ]);

      
      const reactions = await Reaction.create([
        {
          reactionBody: 'Cool thought!',
          username: users[1].username,
          thoughtId: thoughts[0]._id,
        },
        {
          reactionBody: 'Interesting!',
          username: users[0].username,
          thoughtId: thoughts[1]._id,
        },
        
      ]);

      console.log('Seed data inserted:', users, thoughts, reactions);
    } catch (err) {
      console.error('Seed error:', err);
    } finally {
      mongoose.disconnect(); 
    }
  };

  seedData();
});
