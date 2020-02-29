const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//DetailsSchema
const DetailsSchema = new Schema({
    count : Number,
    stepone : String,
    steptwo : String
})

//User Schema
const UserSchema = new
 Schema({
   name : {
       type : String,
       required : true
   } ,
   laundryid: {
       type : Number,
       required : true
   },
   password : {
       type : String,
       required : true
   },
   date : {
       type : Date,
       default : Date.now
   },
   details 
   : [DetailsSchema]             //Relational Schema
})

const User = mongoose.model('User',UserSchema);

module.exports = User;