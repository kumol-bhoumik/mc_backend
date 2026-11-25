const User = require('../models/User');
class UserService {
    async findUser(query) {
        return await User.findOne(query);
    }

    async createUser(userData) {
        const newUser = new User(userData);
        return await newUser.save();
    }

    async registerUser(userData) {
        const newUser = new User(userData);
        return await newUser.save();
    }

    async updateUser(query, updateData) {
        const user = await User.findOneAndUpdate(query, updateData, { new: true });
        return user;
    }

    async deleteUser(query) {
        const user = await User.findOneAndDelete(query);
        return user;
    }

    async getUser(query) {
        const user = await User.find(query);
        return user;
    }
}

module.exports = new UserService();