// companyRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authzMiddleware = require('../middleware/authzMiddleware');
const userController = require('../controllers/userController');
const companyController = require('../controllers/companyController');

router.get('/', companyController.index);
router.post('/show-company', companyController.show);
router.post('/store-company', companyController.store);
router.post('/update-company', companyController.update);
router.post('/delete-company', companyController.destroy);
router.get('/', authMiddleware.authenticateUser, authzMiddleware.authorizeUser(['admin']), userController.index);
module.exports = router;
