// companyRoutes.js
const express = require('express');
const router = express.Router();

const companyController = require('../controllers/companyController');

router.get('/', companyController.index);
router.post('/show-company', companyController.show);
router.post('/store-company', companyController.store);
router.post('/update-company', companyController.update);
router.post('/delete-company', companyController.destroy);

module.exports = router;
