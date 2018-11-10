const userDAO = require('../DAO/userDAO');
const sessionDAO = require('../DAO/sessionDAO');
const async = require('async');
const _ = require('underscore');
const privateKey = "abcdefghijklmnopqrstuvxyz";

module.exports.login = (payload,callback)=>{
    let sessionId;
    async.waterfall(
        (cb)=>{
            sessionId = payload.email.split('+');
            sessionId =  payload.sessionId.length>1 ? payload.sessionId[1] : 0;
            sessionDAO.getSession(sessionId,cb)
        },
        (cb,session)=>{
            if(!session){
                return cb('InvalidSession')
            }
            userDAO.getUser(payload.email,cb)
        },
        (cb,user)=>{
            if(user){
                userDAO.setUserDetails(user._id,{'lastLogInAt':new Date()},cb)
            }
            else{
                let newUser = _.pick(payload,['email','firstName','lastName','']);
                userDAO.addUser(newUser,cb)
            }
        },
        (cb,res)=>{
            sessionDAO.updateSession(sessionId,{'userEmail':payload.email},cb)
        },
        (err,result)=>{
            callback(err,{email:payload.email})
        });
};


module.exports.createSession = (payload,callback)=>{
    sessionDAO.addSession({'id':payload.id},callback)
};


module.exports.pollSession = (payload,callback)=>{
    sessionDAO.getSession({'id':payload.id},((err,session)=>{
        sessionDAO.updateSession({'id':payload.id},{'isFulfilled':true},()=>{
            callback(null,session)
        })
    }))
};