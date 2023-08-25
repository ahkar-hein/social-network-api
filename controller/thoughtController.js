const { User, Thought } = require('../models');

module.exports = {
    async getThought(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
          } catch (err) {
            res.status(500).json(err);
          }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findById(req.params.id);
            if (!thought) {
              return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(thought);
          } catch (err) {
            res.status(500).json(err);
          }
    },
    async createNewThought(req, res) {
      try {
        const newThought = await Thought.create(req.body);
    
        const user = await User.findOne(newThought.userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        user.thoughts.push(newThought._id);
        await user.save();
    
        res.json(newThought);
      } catch (err) {
        res.status(400).json(err);
      }
    },
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
    async deleteThought(req, res) {
        try {
            const deletedThought = await Thought.findByIdAndDelete(req.params.id);
            if (!deletedThought) {
              return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(deletedThought);
          } catch (err) {
            res.status(400).json(err);
          }
    }
}