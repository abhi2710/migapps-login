/**
 * Created by abhinav
 */
const mongoose=require('mongoose');


const sessionSchema=new mongoose.Schema({
    id:{type:Number,required:true,unique:true},
    userEmail:{type:String},
    createdAt:{type:Date,required:true,default:new Date()},
    isFulfilled:{type:Boolean,default:false}
});


module.exports = mongoose.model("sessions",sessionSchema);
