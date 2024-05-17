const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Authentication token is required" });
    }

    try {
        const decoded = jwt.verify(token, 'secret'); 
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid authentication token" });
    }
};

module.exports = {
    authenticateUser
};