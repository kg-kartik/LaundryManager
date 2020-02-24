
const express = require('express');
const router = express.Router();
const User = require('../models/user.js')
const bcrypt = require('bcryptjs');
const passport = require('passport');


router.get('/login',(req,res) => {
    res.render('login');
})

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login');
    }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/dashboard/' + user.name);
      });
    })(req, res, next);
  });

//Logout Handle
router.get('/logout',(req,res)=> {
    req.logout();
    req.flash('success_msg','You are logged out');
    res.redirect('/users/login');
})

module.exports = router;