const mongoose = require('mongoose');

const orgSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    next: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

orgSchema.pre('save', function(next) {
    this.id = this._id.toString();
});

module.exports = mongoose.model('User', userSchema, "users");
