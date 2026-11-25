const mongoose = require('mongoose');
let url = process.env[`DB_URL_${process.env.ENVIRONMENT}`];
console.log(url)
let connection = mongoose.connect(url);

connection.finally(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

module.exports = connection;