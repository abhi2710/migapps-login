const userDAO = require('../DAO/userDAO');
const sessionDAO = require('../DAO/sessionDAO');
const async = require('async');
const _ = require('underscore');
const privateKey = "abcdefghijklmnopqrstuvxyz";

module.exports.login = (payload,callback)=>{
    let sessionId;
    console.log("payload",payload)
    async.waterfall(
        (cb)=>{
            sessionId = payload.email.split('@')
            sessionId = sessionId[0].split('+');
            sessionId = sessionId.length>1 ? sessionId[1] : 0;
            sessionId = sessionId.toString()
            console.log("sessionId",sessionId)
            sessionDAO.getSession(sessionId,cb)
        },
        (cb,session)=>{
            console.log("session",session)
            if(!session){
                return cb('InvalidSession')
            }
            userDAO.getUser(payload.email,cb)
        },
        (cb,user)=>{
            console.log("user",user)
            if(user){
                userDAO.setUserDetails(user._id,{'lastLogInAt':new Date()},cb)
            }
            else{
                let newUser = _.pick(payload,['email','firstName','lastName','']);
                userDAO.addUser(newUser,cb)
            }
        },
        (cb,res)=>{
            console.log("res",res)
            sessionDAO.updateSession(sessionId,{'userEmail':payload.email},cb)
        },
        (err,result)=>{
            callback(err,{email:payload.email})
        });
};


module.exports.createSession = (payload,callback)=>{
    payload.id = payload.id.toString()
    sessionDAO.addSession({'sessionId':payload.id},callback)
};


module.exports.pollSession = (payload,callback)=>{
    payload.id = payload.id.toString()
    sessionDAO.getSession(payload.id,((err,session)=>{
        console.log("session",session)
        if(!session){
            return callback(null,null)
        }
        sessionDAO.updateSession({'sessionId':payload.id},{'isFulfilled':true},()=>{
            callback(null,session)
        })
    }))
};