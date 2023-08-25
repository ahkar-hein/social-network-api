const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
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
    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(deletedUser);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    async createFriend(req, res) {
        try {
            const user = await User.findById(req.params.userId);
            const friend = await User.findById(req.params.friendId);

            if (!user || !friend) {
                return res.status(404).json({ message: 'User or friend not found' });
            }

            user.friends.push(friend);
            await user.save();

            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    async deleteFriend(req, res) {
        try {
            const user = await User.findById(req.params.userId);
            const friend = await User.findById(req.params.friendId);

            if (!user || !friend) {
                return res.status(404).json({ message: 'User or friend not found' });
            }

            user.friends.pull(friend._id);
            await user.save();

            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    }
}