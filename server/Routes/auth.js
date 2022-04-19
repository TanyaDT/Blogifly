const express = require('express');
const router = express.Router();
const authController = require('../Controlers/authControllers');

router.post('/', authController.handleLogin);

module.exports = router;