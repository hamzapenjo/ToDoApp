const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const userRoutes = require('./routes/user');
const registrationRoutes = require('./routes/registration');
const companyRoutes = require('./routes/company');
const loginRoutes = require('./routes/login');

mongoose.connect('mongodb://localhost:27017/walterdb')
const db = mongoose.connection;
db.on('error', (err) => {
    console.log(err);
});
db.once('open', () => {
    console.log('Connected');
});

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/auth', registrationRoutes);
app.use('/api/company', companyRoutes);
app.use('/auth', loginRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Port configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
