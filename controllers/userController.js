const { response } = require('express');
const User = require('../models/user');

// Get all users
const index = (req, res, next) => {
    User.find()
    .then(response => {
        res.json({
            response
        });
    })
    .catch(error => {
        res.json({
            message: "An error occurred while fetching users."
        });
    });
};

// Get a single user by ID
const show = (req, res, next) => {
    let userID = req.body.userID;
    User.findById(userID)
    .then(response => {
        res.json({
            response
        });
    })
    .catch(error => {
        res.json({
            message: "Can't find user with that ID."
        });
    });
};

// Create a new user
const store = (req, res, next) => {
    let user = new User({
        ime: req.body.ime,
        prezime: req.body.prezime,
        username: req.body.username,
        sifra: req.body.sifra,
        companyID: req.body.companyID
    });
    user.save()
    .then(response => {
        res.json({
            message: "User added successfully."
        });
    })
    .catch(error => {
        res.json({
            message: "Can't add user."
        });
    });
};

// Update a user by ID
const update = (req, res, next) => {
    let userID = req.body.userID;
    let updateUser = {
        ime: req.body.ime,
        prezime: req.body.prezime,
        username: req.body.username,
        sifra: req.body.sifra
    };
    User.findByIdAndUpdate(userID, {$set: updateUser})
    .then(() => {
        res.json({
            message: "User updated successfully."
        });
    })
    .catch(error => {
        res.json({
            message: "Can't update user."
        });
    });
};

// Delete a user by ID
const destroy = (req, res, next) => {
    let userID = req.body.userID;
    User.findByIdAndDelete(userID)
    .then(() => {
        res.json({
            message: "User deleted successfully."
        });
    })
    .catch(error => {
        res.json({
            message: "Can't delete user."
        });
    });
};

module.exports = {
    index,
    show,
    store,
    update,
    destroy
};
