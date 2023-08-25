const { User } = require('../models');

module.exports = {
    // function for getting all user with associated friends
    async getUsers(req, res) {
        try {
            const users = await User.find()
                .populate('friends', 'username');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // function for getting single user with associated friend
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
                .populate('friends', 'username')
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // function for create new user
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // function for update user
    async updateUser(req, res) {
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
            if (!updateUser) {
                return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(updateUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // function for delete user
    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'Successfully deleted' });
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // function for create new friend
    async createFriend(req, res) {
        try {
            const user = await User.findById(req.params.userId);
            const friend = await User.findById(req.params.friendsId);
            // JSON message with be appera if user or friends cannot be found
            if (!user || !friend) {
                return res.status(404).json({ message: 'User or friend not found' });
            }
            // otherwise push firend into user array and save
            user.friends.push(friend);
            await user.save();

            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // function for delete friend
    async deleteFriend(req, res) {
        try {
            const user = await User.findById(req.params.userId);
            const friend = await User.findById(req.params.friendsId);

            if (!user || !friend) {
                return res.status(404).json({ message: 'User or friend not found' });
            }

            user.friends.pull(friend._id);
            await user.save();

            res.json({ message: 'Successfully deleted' });
        } catch (err) {
            res.status(400).json(err);
        }
    }
}