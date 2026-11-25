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
    password: { 
        type: String,
    },
    org: [{
        org_id: String,
        role: {
            type: String,
            enum: ['admin', 'member'],
            default: 'member'
        }
    }],
    savings: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

userSchema.pre('save', function(next) {
    this.id = this._id.toString();
});

module.exports = mongoose.model('User', userSchema, "users");
