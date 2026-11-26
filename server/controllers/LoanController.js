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
            let { status, page, limit, org } = req.query;
            const skip = (page - 1) * limit;
            const query = status ? { status } : {};
            if(org) query.org = org;
            let aggregationPipeLine = [{
                $match: query
            },{
                $lookup: {
                    from: "users",
                    let: { guarantor : "$guarantor"},
                    pipeline: [
                        {
                            $match: {
                                $expr:{
                                    $eq:["$id", "$$guarantor"]
                                }
                            }
                        }
                        ],
                        as: "gr"
                    }
            },{
                $project: {
                    "org" : 1,
                "id" : 1,
                "loan_id" : 1,
                "name" : 1,
                "phone" : 1,
                "nid" : 1,
                "address" : 1,
                "occupation" : 1,
                "purpose" : 1,
                "amount" : 1,
                "rate" : 1,
                "applied" : 1,
                "startDate" : 1,
                "base": 1,
                "status" : 1,
                "paidCount" : 1,
                "guarantor" : { $ifNull: [{ $first: "$gr.name" }, ""]},
                "gPhone" : { $ifNull: [{ $first: "$gr.phone" }, 0]},
                "gNid" : "",
                "relation" : "",
                }
            }];
            if(skip && limit){
                aggregationPipeLine.push({
                    $skip: skip
                });
                aggregationPipeLine.push({
                    $limit: parseInt(limit)
                })
            }
            const loans = await Loan.aggregate(aggregationPipeLine)
            // const loans = await Loan.find(query).skip(skip).limit(parseInt(limit));
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