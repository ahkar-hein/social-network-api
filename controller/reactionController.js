const { Thought, Reaction } = require('../models');

module.exports = {
  // This function is for create a reaction with associated thought
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
    // function for delete reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
        
            if (!thought) {
              return res.status(404).json({ message: 'Thought not found' });
            }
        
            thought.reactions.pull(req.params.reactionId);
            await thought.save();
        
            await Reaction.findByIdAndDelete(req.params.reactionId);
        
            res.json({message: 'successfully deleted'});
          } catch (err) {
            res.status(400).json(err);
          }
    }

}