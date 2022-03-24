const Staff = require('../models/staff')
const passport = require('passport');
const Complain = require('../models/complain');
const jwt =require('jsonwebtoken');

exports.registerMainEntity = async (activity) => {
    try {

        //create the user instance
        user = new Staff(activity.req.body)
        const password = activity.req.body.password
        //save the user to the DB
        await Staff.register(user, password, function (error, user) {
          if (error) return activity.res.json({ success: false, error }) 
          const newUser = {
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            __v: user.__v
          }
          activity.res.json({ success: true, newUser })
          
        })
      } catch (error) {
        activity.res.json({ success: false, error })
      }
}

exports.changeMainPassword = async (activity) => {
    const {username} = req.query
    Staff.findOne({ username },(err, user) => {
      // Check if error connecting
      if (err) {
        res.json({ success: false, message: err }); // Return error
      } else {
        // Check if user was found in database
        if (!user) {
          res.json({ success: false, message: 'User not found' }); // Return error, user was not found in db
        } else {
          user.changePassword(req.body.oldpassword, req.body.newpassword, function(err) {
             if(err) {
                      if(err.name === 'IncorrectPasswordError'){
                           res.json({ success: false, message: 'Incorrect password' }); // Return error
                      }else {
                          res.json({ success: false, message: 'Something went wrong!! Please try again after sometimes.' });
                      }
            } else {
              res.json({ success: true, message: 'Your password has been changed successfully' });
             }
           })
        }
      }
    });
}

exports.forgetMainPassword = async () => {
    const newPassword = math.randomNumber()
  try {

      const user = await Staff.findOne({
        username: req.query.username
    });
    await user.setPassword(newPassword.toString());
    const updatedUser = await user.save();
    const data = {
      from: "MAU@gmail.com",
      to: "onemustyfc@gmail.com",
      subject: "CHANGED PASSWORD",
      text: `Your new password is ${newPassword}`
    };
    mg.messages().send(data, function (error, body) {
      console.log(body);
    });
    res.json({success:true, message:"Password have been reset and sent to email"})
  } catch (error) {
    res.json({success:false, message:error})
  }
  
}

exports.loginMainStaff = async (activity) => {
    let payLoad = {}
  // perform authentication
  passport.authenticate('staff', (error, user, info) => {
    if (error) return activity.res.json({ success: false, error })
    if (!user)
      return activity.res.json({
        success: false,
        message: 'username or password is incorrect'
      })
    //login the user  
    activity.req.login(user, (error) => {
      if (error){
        activity.res.json({ success: false, message: 'something went wrong pls try again' })
      }else {
        activity.req.session.user = user
        payLoad.id = user.username
        const token = jwt.sign(payLoad, 'myVerySecret');

        const newUser = {
          token: token,
          _id: user._id,
          username: user.username,
          fullName: user.fullName,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          __v: user.__v
        }
        
        activity.res.json({ success: true, message: 'staff login successful', newUser})
      }
    })
  })(activity.req, activity.res, activity.next)
}