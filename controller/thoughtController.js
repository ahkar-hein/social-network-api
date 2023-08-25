const { Thought } = require('../models');

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
    }
}