const router = require('express').Router();
// import all the CURD function for user and friends
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    createFriend,
    deleteFriend,
} = require('../../controller/userController')

// implement the relevent route and assign the relevent get, post, put and delete
router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendsId').post(createFriend).delete(deleteFriend);

module.exports = router;