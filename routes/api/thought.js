const router = require('express').Router();

const {
    getThought,
    getSingleThought,
    createNewThought,
    updateThought,
    deleteThought,
} = require('../../controller/thoughtController');

const {
    createReaction,
    deleteReaction,
} = require('../../controller/reactionController')

router.route('/').get(getThought).post(createNewThought);
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);
router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction);

module.exports = router;