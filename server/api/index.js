const express = require('express');
const router = express.Router();
const userRoute = require('./routes/user');
const loanRoute = require("./routes/loan");
router.use('/user', userRoute);
router.use('/loans', loanRoute);
module.exports = router;