const express = require('express');
const router = express.Router();
const User = require('../models/user.js')
const bcrypt = require('bcryptjs');
const passport = require('passport');

router.get('/register',(req,res) =>{
    res.render('register');
})

router.get('/login',(req,res) => {
    res.render('login');
})

//Register handler
router.post('/register',(req,res) => {
    const {name,email,password,password2} = req.body;
    let errors = [];

    if(!name || !email || !password || !email){
        errors.push({
            msg : "Please fill the required fields"
        })
    }

    if(password != password2){
        errors.push({
            msg : "Passwords didnt match"
        })
    }

    if(password.length <6 ){
        errors.push({
           msg : "Password's should be atleast 6 charachters" 
        })
    }
    
    if(errors.length > 0) {
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        });
    }
    else {
        //Validation
        User.findOne({
            email : email
        }).then((user) => {
            if(user) {
                //if user exists
                errors.push({
                    msg : "Email already exists"
                }) 
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                })
            }
            else {
                const newUser = new User({
                    name,
                    email,
                    password,
                })
                //Hash Passwords
                bcrypt.genSalt(10,(err,salt) => {  //10 are the salt rounds
                    bcrypt.hash(newUser.password,salt,(err,hash) =>{
                        if(err) {
                            throw err;
                        }
                        //Setting the new password to hash
                        newUser.password = hash;
                        newUser.save()
                        .then(user => {
                            req.flash('success_msg', 'You are now registered and can login');
                            res.redirect('/users/login');
                            console.log(newUser);
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                    });
                })
            }
        })
    }    
})


//Login Handle
router.post('/login',(req,res,next) => {
    passport.authenticate('local',{
        successRedirect : '/dashboard',
        failureRedirect : '/users/login',
        failureFlash : true,
        successFlash : 'Welcome to the dashboard'
    }) (req,res,next)
})

//Logout Handle
router.get('/logout',(req,res)=> {
    req.logout();
    req.flash('success_msg','You are logged out');
    res.redirect('/users/login');
})
module.exports = router;