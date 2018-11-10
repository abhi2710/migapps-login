const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST Login */
router.post('/login', function(req, res, next) {
    const body = req.body || {};
    if(body.from && body.to) {
        userController.login(body,(err,result)=>{
            console.log("LOGIN DONE",err,result)
        });
    }
    res.writeHead(200, {'Content-Type':'application/json'});
    res.write(JSON.stringify({status:'ok'}));
    res.end();
});


/* GET Session */
router.get('/session', function(req, res, next) {
    console.log("kkd")
    const body = req.query || {};
    if(body.id) {
        userController.pollSession(body, (err, result) => {
            res.writeHead(200, {'Content-Type':'application/json'});
            res.write(JSON.stringify({status:'ok',data:result}));
            res.end();
        });
    }
});


/* POST Session */
router.post('/sessions', function(req, res, next) {
    const body = req.body || {};
    if(body.id) {
        userController.createSession(body, (err, result) => {
    })
    }
    res.writeHead(200, {'Content-Type':'application/json'});
    res.write(JSON.stringify({status:'ok'}));
    res.end();
});

module.exports = router;
