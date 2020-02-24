const express = require('express');
const router = express.Router();


router.get('/login',(req,res) => {
    res.render('loginadmin');
})

router.post('/login',(req,res) => {
    const password = req.body.password;
    if(password === "hello")
    {
        res.redirect("/admin/dashboard")
    }
    else {
        req.flash('error_msg','Incorrect Password, Try Again');
        res.redirect('/admin/login');
    }
})

router.get('/dashboard',(req,res) => {
    res.render('admindashboard');
})

module.exports = router;