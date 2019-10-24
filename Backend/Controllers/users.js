database = require("../database");
var db = database.getdb();
let jwt = require('jsonwebtoken');
let config = require('../config');
let middleware = require('../middleware');

async function loginUser(req,res){
  var username = req.body.username;
  var password = req.body.password;

  var data = {
      "username": username,
      "password":password,
  }

  try {
    console.log({username:data.username,password:data.password});
    const result = await db.collection('details').findOne({username: data.username, password: data.password});

    if (result){
      let token = jwt.sign({username: data.username},
        config.secret,
        {
          expiresIn: '24h'
        }
      );

      res.status(200).json({
        success: true,
        message: 'Authentication successful!',
        token: token
      })
      console.log("Successful login.");
    }

    else{
      res.status(404).send("Failed login");
    }

  }
  catch (err){
    console.log(err);
    res.status(404).send("Failed retrieve");
  };
}


function signupUser(req,res){
    var name = req.body.name;
    var username = req.body.username;
    var email =req.body.email;
    var pass = req.body.password;
    var phone =req.body.phone;

    var data = {
          "name": name,
          "username":username,
          "email":email,
          "password":pass,
          "phone":phone
      }

    db.collection('details').insertOne(data,function(err, collection){
      if (err) throw err;
      console.log("Record inserted Successfully");
      res.status(200).send("Successful signup");
    });
}

async function userInfo(req,res){
  const result = await db.collection('details').findOne({username: req.decoded.username});
  res.status(200).send(result);
}

module.exports = {
  signupUser,loginUser,userInfo
}
