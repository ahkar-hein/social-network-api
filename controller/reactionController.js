const { Thought, Reaction } = require('../models');

module.exports = {
    async createReaction(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
        
            if (!thought) {
              return res.status(404).json({ message: 'Thought not found' });
            }
        
            const newReaction = await Reaction.create(req.body);
            thought.reactions.push(newReaction);
            await thought.save();
        
            res.json(newReaction);
          } catch (err) {
            res.status(400).json(err);
          }
    },
    
}