const express = require('express');
const authApiRouter = express.Router();
const User = require('../userSchema');

const sendMail = require('../mailerModule');




authApiRouter.post('/createaccount', async function (req, res) {
  try {

    let user = await User.findOne({ email: req.body.email }).exec();

    if (user) {

      if(user.activated){
        res.json({
          errorCode: 2,
          error:'User already exists.'
        });
      } else {

        let [password, passHash] = await user.activateAccount()
        let message = 'Your EBWA portal password is '+ password;

        let info = await sendMail(req.body.email, "Welcome to EBWA", message);
        
        console.group('Mail Response')
          console.log(info);
        console.groupEnd();

        if(info.accepted.includes(email)) {
          res.redirect('/f/auth/login');
        } else {
          res.redirect('/f/error');
        }
        
      }

    } else {
      res.json({
        errorCode: 1,
        error: 'User not Found'
      })
    }

  } catch (err) {
    res.json({
      errorCode:500,
      error:'Server Error',
      errorMessage: err.message
    });
  }
});

module.exports = authApiRouter