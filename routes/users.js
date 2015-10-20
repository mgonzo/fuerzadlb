var express = require('express');
var router = express.Router();

//var mongoose = require('mongoose');
//var Users = require('../models/users');
//var users = new Users({db: mongoose});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*
router.post('/', function(req, res, next) {
  var user = JSON.parse(JSON.stringify(req.body));

  users.create({
    name: user.name,
    password1: user.password1,
    password2: user.password2
    }, function (message) {
      res.sendStatus(201);
  });
});
*/

module.exports = router;
