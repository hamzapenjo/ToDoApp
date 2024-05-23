const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authzMiddleware = require('../middleware/authzMiddleware');
const userController = require('../controllers/userController');
const registrationController = require('../controllers/registrationController');

router.post('/register', registrationController.register);
router.get('/', authMiddleware.authenticateUser, authzMiddleware.authorizeUser(['admin']), userController.index);

module.exports = router;