const mongoose = require('mongoose');

const savingSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    user_id: {
        type: String
    },
    saving_type: {
        type: String,
        enum: ["loan_instalment", "member_saving"]
    },
    date: {
        type: String
    },
    loan_id: {
        type: String
    },
    amount: {
        type: Number
    },
    org_id: {
        type: String,
        required: true
    },
    created_by: {
        type: String
    }
}, { timestamps: true });


module.exports = mongoose.model('Saving', savingSchema, "savings");
