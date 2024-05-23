const authorizeUser = (roles) => {
    return (req, res, next) => {
        const userRole = req.userData.role;

        if (!roles.includes(userRole)) {
            return res.status(403).json({ message: 'Forbidden: You do not have the necessary permissions' });
        }
        
        next();
    };
};

module.exports = {
    authorizeUser
};
