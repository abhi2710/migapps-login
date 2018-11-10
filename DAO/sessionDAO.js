const models=require('../models'),
    DAOmanager=require('./DAOmanager');



const addSession=function(sessionData,callback){
    DAOmanager.setData (models.sessions,sessionData,callback);
};


const getSession = (id,callback)=>{
    DAOmanager.getData(models.sessions, {sessionId:id,isFulfilled:false}, {},{}, function (err, document) {
        console.log("docu",document)
        callback(err,document);
    });
};


const updateSession = (id,data,callback)=>{
    DAOmanager.update(models.sessions,{sessionId:id},{$set:data},{},function(err,data){
        callback(err,data);
    });
};

module.exports={
    addSession:addSession,
    getSession:getSession,
    updateSession:updateSession
};