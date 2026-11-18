const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    email: { 
        type: String
    },
    password: { 
        type: String,
    },
    type: {
        type: [String],
        enum: ['customer', 'admin', 'member'],
        default: ['customer']
    },
    org: {
        type: String,
        required: true
    }
}, { timestamps: true });

userSchema.pre('save', function(next) {
    this.id = this._id.toString();
});

module.exports = mongoose.model('User', userSchema, "users");
