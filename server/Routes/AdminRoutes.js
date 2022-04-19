const express = require('express')
const router = express.Router()
const adminController = require('../Controlers/AdminController')
const multer = require("multer")
const upload = multer({dest: "./server/uploads"})



router.post('/login', adminController.Login)
router.post('/register', adminController.Register)
// router.post('/activate', adminController.Activate) 
router.get('/logout', adminController.logout)
router.patch('/profile', upload.single("image"),adminController.Profile)

router.get('/verification', adminController.Verification)

router.post('/changePassword', adminController.changePassword) 

module.exports = router 