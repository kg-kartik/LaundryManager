const express = require('express');
const router = express.Router();
const User = require("../models/user.js")

router.get('/update',(req,res) => {
    res.render('update');
})

router.post('/update',(req,res) => {
    
    const {password,laundryid,stepone,steptwo} = req.body;
    let errors = [];

    if(password !== 'hello')
    {
        errors.push({
            msg : "Incorrect Password"
        })
    }

     //Validating Unique laundry Id of the user
    User.findOne({laundryid : laundryid}).then(user => {
        if(!user) {
            errors.push({
                msg : "User not found"
            })
        }
    })
    
    User.findOne({laundryid : laundryid}).then((record) => {
        record.details.push({
            count : 0, 
            stepone : stepone,
            steptwo : steptwo
        })
        record.save().then(() => {
            User.findOne({
                laundryid : laundryid
            })
            .then((result) => {
                console.log(result);
            })
        })
    })
    // if(stepone || steptwo === 'on')
    // {
    //     console.log("yes");
    // }
    // if(stepone || steptwo === 'off')
    // {
    //     console.log("no");
    // }
    
    
    if (errors.length > 0)
    {
        res.redirect("/admin/update");
    }
    else {
        res.redirect("/users/login");
    }

})


module.exports = router;

