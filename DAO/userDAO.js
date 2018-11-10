const models=require('../models'),
    DAOmanager=require('./DAOmanager');


const setUserDetails=function(userId,data,callback) {
    DAOmanager.update(models.users,{_id:userId},{$set:data},{},function(err,result) {
        return callback(err,result);
    });
};

const setAccessToken=function(userId,token,callback) {
    DAOmanager.update(models.users, {_id: userId}, {accessToken:token},{},callback);
};


const addUser=function(user,callback){
    DAOmanager.setData (models.users,user,callback);
};


const getUser = (email,callback)=>{
    DAOmanager.getData(models.users, {email:email}, {accessToken:0,password:0},{}, function (err, document) {
        console.log("docum",document)
        callback(err,document);
    });
};


const deleteUser = (username,callback)=>{
    DAOmanager.update(models.users,{username:username},{$set:{isDeleted:true}},{},function(err,data){
        callback(err,data.nModified);
    });
};

module.exports={
    setAccessToken:setAccessToken,
    setUserDetails:setUserDetails,
    addUser:addUser,
    getUser:getUser,
    deleteUser:deleteUser
};