const { User, Thought } = require('../models');

module.exports = {
  // function for getting all thought with associated reaction and user name
    async getThought(req, res) {
        try {
            const thoughts = await Thought.find()
              .populate({
              path: 'reactions',
              select: 'reactionBody username createdAt', 
          });
            res.json(thoughts);
          } catch (err) {
            res.status(500).json(err);
          }
    },
    // function for single thought with relevent username and reaction
    async getSingleThought(req, res) {
      try {
          const thought = await Thought.findById(req.params.id)
              .populate({
                  path: 'reactions',
                  select: 'reactionBody username createdAt', 
              });
  
          if (!thought) {
              return res.status(404).json({ message: 'Thought not found' });
          }
          res.json(thought);
      } catch (err) {
          res.status(500).json(err);
      }
  },
  // function for create new thought
    async createNewThought(req, res) {
      try {
        const newThought = await Thought.create(req.body);
    
        const user = await User.findOne(newThought.userId);
        
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    // push the associated id into user
        user.thoughts.push(newThought._id);
        await user.save();
    
        res.json(newThought);
      } catch (err) {
        res.status(400).json(err);
      }
    },
    // function for update thought
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(
              req.params.id,
              req.body,
              {
                new: true,
                runValidators: true
              }
            );
            if (!updatedThought) {
              return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(updatedThought);
          } catch (err) {
            res.status(400).json(err);
          }
    },
    // function for delete thought
    async deleteThought(req, res) {
        try {
            const deletedThought = await Thought.findByIdAndDelete(req.params.id);
            if (!deletedThought) {
              return res.status(404).json({ message: 'Thought not found' });
            }
            res.json({message: 'Successfully Deleted'});
          } catch (err) {
            res.status(400).json(err);
          }
    }
}