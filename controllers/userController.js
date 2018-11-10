const userDAO = require('../DAO/userDAO');
const sessionDAO = require('../DAO/sessionDAO');
const async = require('async');
const _ = require('underscore');
const privateKey = "abcdefghijklmnopqrstuvxyz";

module.exports.login = (payload,callback)=>{
    let sessionId;
    console.log("payload",payload)
    async.waterfall([
        (cb)=>{
            console.log("payloapayloadd",payload)
            sessionId = payload.to.split('@')
            console.log("payload",sessionId)
            sessionId = sessionId[0].split('+');
            console.log("payload",sessionId)
            sessionId = sessionId.length>1 ? sessionId[1] : 0;
            console.log("payload",sessionId)
            sessionId = sessionId.toString()
            console.log("payload",sessionId)
            console.log("sessionId",sessionId)
            sessionDAO.getSession(sessionId,false,cb)
        },
        (session,cb)=>{
            console.log("session",session)
            if(!session){
                return cb('InvalidSession')
            }
            userDAO.getUser(payload.from,cb)
        },
        (user,cb)=>{
            console.log("user",user)
            if(user){
                userDAO.setUserDetails(user._id,{'lastLogInAt':new Date()},cb)
            }
            else{
                let newUser = {'email':payload.from}
                userDAO.addUser(newUser,cb)
            }
        },
        (res,cb)=>{
            console.log("res",res)
            sessionDAO.updateSession(sessionId,{'userEmail':payload.from,'isFulfilled':true},cb)
        }],
        (err,result)=>{
            callback(err,{email:payload.from})
        });
};


module.exports.createSession = (payload,callback)=>{
    payload.id = payload.id.toString()
    sessionDAO.addSession({'sessionId':payload.id},callback)
};


module.exports.pollSession = (payload,callback)=>{
    payload.id = payload.id.toString()
    sessionDAO.getSession(payload.id,true,((err,session)=>{
        return callback(null,session)
    }))
};