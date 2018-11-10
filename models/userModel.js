/**
 * Created by abhinav
 */
const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    firstName:{type:String},
    lastName:{type:String},
    isDeleted:{type:Boolean,required:true,default:false},
    lastLogInAt:{type:Date,required:true,default:new Date()},
    createdAt:{type:Date,required:true,default:new Date()},
});

module.exports = mongoose.model("users",userSchema);
