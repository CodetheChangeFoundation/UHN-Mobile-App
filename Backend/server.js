const database = require('./database');
database.connect();
const user = require('./Controllers/users');
var express=require("express");
var bodyParser=require("body-parser");

let jwt = require('jsonwebtoken');
let config = require('./config');
let middleware = require('./middleware');


var app=express()
app.use(express.static(__dirname + "/../public"));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/sign_up', user.signupUser);
app.post('/login', user.loginUser);
app.get('/userinfo',middleware.checkToken,user.userInfo);

app.listen(3000, function(){
  console.log("Server is running");
});
