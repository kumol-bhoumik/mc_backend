const express = require('express');
const router = express.Router();
const loanController = require('../../controllers/LoanController');

router.post('/create', loanController.createLoan);
router.post('/update/:id', loanController.updateLoan);
router.get('/:id', loanController.getLoanById);
router.get('/', loanController.getAllLoans);

module.exports = router;
