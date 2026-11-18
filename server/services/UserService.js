class UserService {
    static async findUser(query) {
        return await User.findOne(query);
    }

    static async createUser(userData) {
        const newUser = new User(userData);
        return await newUser.save();
    }

    static async registerUser(userData) {
        const newUser = new User(userData);
        return await newUser.save();
    }
}

module.exports = new UserService();