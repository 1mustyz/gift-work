var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController')
const passport = require('passport');


/** All post request *//////////////////////////////////////////////

// register staff route
router.post('/register-staff',  adminController.registerStaff)

// create client from a file
// router.post('/create-client-from-file', adminController.registerClientFromAfile)


// create complain
router.post('/create-complain',  adminController.createComplain)

// get all comlain
router.get('/get-all-complain',  adminController.getAllComplain)



// login staff
router.post('/login', adminController.loginStaff)



module.exports = router;