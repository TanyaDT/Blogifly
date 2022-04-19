const express = require('express');
const router = express.Router();
const usersController = require('../Controlers/UserControllers');


router.delete('delete', usersController.deleteUser)
router.get('get', usersController.getUser)

module.exports = router;
