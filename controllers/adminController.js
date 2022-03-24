const Staff = require('../models/staff')
const passport = require('passport');
const multer = require('multer');
const {singleUpload,singleFileUpload} = require('../middlewares/filesMiddleware');
const { uuid } = require('uuidv4');
const jwt =require('jsonwebtoken');
const csv = require('csv-parser')
const fs = require('fs')
const msToTime = require('../middlewares/timeMiddleware')
const math = require('../middlewares/math.middleware')
const randomstring = require("randomstring");
const cloudinary = require('cloudinary');
const mailgun = require("mailgun-js");
const Complain = require('../models/complain');
const DOMAIN = "sandbox09949278db4c4a108c6c1d3d1fefe2ff.mailgun.org";
const mg = mailgun({apiKey: "9bd20544d943a291e8833abd9e0c9908-76f111c4-8a189b96", domain: DOMAIN});
const {registerMainEntity,loginMainStaff} = require('../middlewares/registerStaff')
const complainActivity = require('../middlewares/complain')

// cloudinary configuration for saving files
cloudinary.config({
    cloud_name: 'mustyz',
    api_key: '727865786596545',
    api_secret: 'HpUmMxoW8BkmIRDWq_g2-5J2mD8'
})


// staff registration controller
exports.registerStaff = (req, res, next) => {registerMainEntity({req,res,next})}

  // reset password
exports.changePassword = async (req, res, next) => {
   
}

exports.forgetPassword = async (req,res,next) => {

    
}

  // staff login controller
exports.loginStaff = (req, res, next) => {loginMainStaff({req,res,next})}

exports.createComplain = async(req,res,next) => {
  const result = await complainActivity.create({req,res,next})
  res.json(result)
}

exports.getAllComplain = async (req,res,next) => {
  console.log('ksks')
  const result = await complainActivity.findAll({req,res,next})
  res.json(result)
}