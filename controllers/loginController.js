const bcrypt = require('bcrypt');
const User = require('../models/user');

const login = async (req, res, next) => {
    const { username, sifra } = req.body;

    // Validate input data
    if (!username || !sifra) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        // Find user by username
        const user = await User.findOne({ username });

        // Check if user exists
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(sifra, user.sifra);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // If username and password are correct, user is logged in
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    login
};
