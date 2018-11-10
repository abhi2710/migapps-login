const mongoose=require('mongoose'),
    express = require('express'),
    app = express(),
    expressValidator = require('express-validator'),
    bodyparser=require('body-parser'),
    usersRouter = require('./routes/users');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(expressValidator());
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.listen(3000);
app.get('/', function(req, res) {
    res.send('hello world');
});

app.use('/users', usersRouter);


// mongoose.connect('mongodb://localhost/migApps');
// mongoose.connection.once('connected', function() {
//     console.log("Connected to database migAppsDB")
// });
