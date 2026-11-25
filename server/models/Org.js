const mongoose = require('mongoose');

const orgSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    regNo: {
        type: String,
        default: null
    },
    admin: [{
        type: String
    }],
    users: [{
        type: String
    }],
    next: {
        type: Number,
        default: 0
    }
}, { timestamps: true });


module.exports = mongoose.model('Org', orgSchema, "orgs");
