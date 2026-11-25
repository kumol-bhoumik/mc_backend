const Loan = require('../models/Loan');
const moment = require('moment');
const { success, error, notFound } = require('../utils/httpresponse');

class LoanController {
    // Create a new loan
    async createLoan(req, res) {
        try {
            const { name, nid, address, occupation, purpose, amount, applied, phone, rate, startDate, status, guarantor, gPhone, gNid, relation, org } = req.body;
            const totalLoans = await Loan.countDocuments();
            const base = moment(applied, 'YYYY-MM-DD').date(5).format('YYYY-MM-DD');
            const newRequestedLoan = new Loan({
                id: `L-${Date.now()}`,
                loan_id: `L-${1000 + totalLoans}`,
                name,
                nid,
                address,
                occupation,
                purpose,
                amount,
                applied,
                base,
                name,
                phone,
                rate,
                startDate,
                status,
                paidCount: 0, 
                guarantor,
                gPhone,
                gNid,
                relation,
                org
            });

            const savedLoan = await newRequestedLoan.save();
            return success(res, 'Loan created successfully', savedLoan, 201);
        } catch (err) {
            return error(res, 'Internal server error', err);
        }
    }

    // Update an existing loan
    async updateLoan(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const updatedLoan = await Loan.findOneAndUpdate({$or: [{id: id}, {loan_id: id}]}, updateData, { new: true });
            if (!updatedLoan) {
                return notFound(res, 'Loan not found');
            }
            return success(res, 'Loan updated successfully', updatedLoan);
        } catch (err) {
            console.error('Error updating loan:', err);
            return error(res, 'Internal server error', err);
        }
    }

    async getLoanById(req, res) {
        try {
            const { id } = req.params;
            const loan = await Loan.findById(id);
            if (!loan) {
                return notFound(res, 'Loan not found');

            }
            return success(res, 'Loan retrieved successfully', loan);
        } catch (err) {
            console.error('Error retrieving loan:', err);
            return error(res, 'Internal server error', err);
        }
    }

    async getAllLoans(req, res) {
        try {
            let { status, page, limit } = req.query;
            const skip = (page - 1) * limit;
            const query = status ? { status } : {};
            const loans = await Loan.find(query).skip(skip).limit(parseInt(limit));
            const totalLoans = await Loan.countDocuments( query );
            const totalPages = Math.ceil(totalLoans / limit);
            return success(res, 'Loans retrieved successfully', loans, 200, { page: parseInt(page), limit: parseInt(limit), total: totalLoans, totalPages });
        } catch (err) {
            console.error('Error retrieving loans:', err);
            return error(res, 'Internal server error', err);
        }
    }
}

module.exports = new LoanController();