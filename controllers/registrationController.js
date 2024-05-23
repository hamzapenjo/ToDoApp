const bcrypt = require('bcrypt');
const User = require('../models/user');

const register = async (req, res, next) => {
    const { ime, prezime, username, sifra, company } = req.body;

    // Validate input data
    if (!ime || !prezime || !username || !sifra || !company) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username is already taken" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(sifra, 10);

        // Create new user
        const newUser = new User({
            ime,
            prezime,
            username,
            sifra: hashedPassword,
            company  // Use 'company' here
        });

        // Save user to the database
        const savedUser = await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            user: savedUser
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    register
};
