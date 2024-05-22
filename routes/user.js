const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.get('/', authMiddleware.authenticateUser, userController.index);
router.post('/show-user', authMiddleware.authenticateUser, userController.show);
router.post('/store-user', authMiddleware.authenticateUser, userController.store);
router.post('/update-user', authMiddleware.authenticateUser, userController.update);
router.post('/delete-user', authMiddleware.authenticateUser, userController.destroy);

module.exports = router;