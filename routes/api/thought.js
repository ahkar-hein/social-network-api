const router = require('express').Router();
// import all CURD function from thought controller
const {
    getThought,
    getSingleThought,
    createNewThought,
    updateThought,
    deleteThought,
} = require('../../controller/thoughtController');
// import all CURD function from reaction controller
const {
    createReaction,
    deleteReaction,
} = require('../../controller/reactionController')
// implement the relevent route and assign the relevent get, post, put and delete
router.route('/').get(getThought).post(createNewThought);
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);
router.route('/:thoughtId/reactions').post(createReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;