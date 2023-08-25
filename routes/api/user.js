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

module.exports = router;