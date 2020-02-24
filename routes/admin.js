const express = require('express');
const router = express.Router();
const User = require("../models/user.js")

//Login Route
// router.get('/login',(req,res) => {
//     res.render('loginadmin');
// })

// router.post('/login',(req,res) => {
//     const password = req.body.password;
//     if(password === "hello")
//     {
//         res.redirect("/admin/dashboard")
//     }
//     else {
//         req.flash('error_msg','Incorrect Password, Try Again ');
//         res.redirect('/admin/login');
//     }
// })

// //Dashboard Route
// router.get('/dashboard',(req,res) => {
//     res.render('admindashboard');
// })

// router.post('/dashboard',(req,res) => {
//     const regno = req.body.regno;
//     User.findOne({regno : regno}).then(user => {
//         if(user) {
//             req.flash('success_msg',`Update laundry details for ${user.name}`);
//             req.redirect('/admin/update/:req.user.regno')
//         }
//     })
// })

router.get('/update',(req,res) => {
    res.render('update');
})



module.exports = router;

