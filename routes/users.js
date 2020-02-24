
const express = require('express');
const router = express.Router();
const User = require('../models/user.js')
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');

router.get('/login',(req,res) => {
    res.render('login');
})

  router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { 
        req.flash('error_msg','Incorrect Registeration No/Password');
        return res.redirect('/users/login');
    }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/dashboard');
      });
    })(req, res, next);
  });


// router.post('/login', (req, res, next) => {
//     passport.authenticate('local', {
//       successRedirect: '/users/dashboard',
//       failureRedirect: '/users/login',
//       failureFlash: true
//     })(req, res, next);
//   });
  

//Logout Handle
router.get('/logout',(req,res)=> {
    req.logout();
    req.flash('success_msg','You are logged out');
    res.redirect('/users/login');
})

module.exports = router;