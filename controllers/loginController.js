const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res, next) => {
    const { username, sifra } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username });

        // Check if user exists
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed: Invalid credentials' });
        }

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(sifra, user.sifra);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed: Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                _id: user._id,
                username: user.username,
                role: user.role
            },
            JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        // Respond with token
        res.status(200).json({
            message: 'Login successful',
            token: token,
            user: {
                _id: user._id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    login
};
