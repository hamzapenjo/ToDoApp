const checkUserAuthorization = (req, res, next) => {
    const userId = req.user.id;

    if (req.params.userId !== userId) {
        return res.status(403).json({ message: "You are not authorized to access this resource" });
    }

    next();
};

module.exports = {
    checkUserAuthorization
};