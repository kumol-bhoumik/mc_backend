const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema(
  {
    org: {
      type: String,
      required: [true, 'Organization is required'],
      trim: true,
    },
    id: {
      type: String,
      required: [true, 'ID is required'],
    },
    loan_id: {
      type: String,
      required: [true, 'Loan ID is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    name: {
      type: String,
      required: [true, 'Applicant name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    nid: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
    },
    occupation: {
      type: String,
      trim: true,
    },
    purpose: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Loan amount is required'],
      min: [10000, 'Amount cannot be negative'],
    },
    rate: {
      type: Number,
      required: [true, 'Interest rate is required'],
      min: [15, 'Interest rate cannot be negative'],
    },
    applied: {
      type: String,
      required: [true, 'Application date is required'],
    },
    startDate: {
      type: String,
    },
    base: {
      type: String,
      required: [true, 'Base date is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'running', 'completed', 'defaulted', 'rejected'],
      default: 'pending',
      lowercase: true,
      trim: true,
    },
    paidCount: {
      type: Number,
      default: 0,
      min: [0, 'Paid count cannot be negative'],
    },
    guarantor: {
      type: String,
      required: [true, 'Guarantor name is required'],
      trim: true,
    },
    gPhone: {
      type: String,
      trim: true,
    },
    gNid: {
      type: String,
      trim: true,
    },
    relation: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Loan', loanSchema, 'loans');
