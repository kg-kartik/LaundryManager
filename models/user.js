const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   name : {
       type : String,
       required : true
   } ,
   regno: {
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
   }
})

const User = mongoose.model('User',UserSchema);
module.exports = User;