const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    createFriend,
    deleteFriend,
} = require('../../controller/userController')

router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendsId').post(createFriend).delete(deleteFriend);

module.exports = router;