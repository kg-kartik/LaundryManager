const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');

//Load User model
const User = require('../models/user');


const validator = (passport) =>{
    passport.use(new LocalStrategy({usernameField : 'regno'}, (regno,password,done) =>{ 
        //Matching User
        User.findOne({regno : regno})
        .then((user) => {
            if(!user)
            {
                return done(null,false, {message : "Incorrect Registeration No" })
            }
            //Matching passwords 

            bcrypt.compare(password,user.password,(err,isMatch) => {
                if(err) {
                    console.log(err);
                }
                if(isMatch) {

                   return done(null,user); //null is for the error part
                }
                else {
                    return done(err,false,{message : "Password is incorrect"})
                }
            })
        }).catch((err) => {
            console.log(err);
        })
    }));

    passport.serializeUser(function(user, done) { 
        //serializing user, credentials used to authenticate the user will only be sent during login request and a session
        // is maintained via a cookie in the browser ... not all user credentials are send via cookie ..instead a user id 
        // sent and credentials are retrieved through it 
        done(null, user.id);
      });
      
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });           
}

module.exports = validator;