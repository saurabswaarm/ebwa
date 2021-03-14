const express = require('express');
const authApiRouter = express.Router(); 

authApiRouter.use('/createaccount', function(req, res) { 
  // 1 - This will first query the database to check if the email is verified
  // 2 - If no, we will redirect to /noinvite
  console.log('claim called on server');
  res.redirect('/auth/noinvite');
})

module.exports = authApiRouter

// /createaccount 