var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var crypto = require('crypto');

var users = require('../models/users');

// setup passport
router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy(
  function(name, password, done) {
    /////// TEMP
    var user = {
      'id': '0001',
      'name': 'foo',
      'password': 'bar',
    };
    user.password = crypto.createHash('sha256').update(user.password).digest('base64');
    /////// END TEMP
    

    // find user by name
    //var user = users.find(name);
    if (!user) {
      return done(null, false, { message: 'No user.' });
    }

    // get user password
    // get sha256 for input password
    // if passwords do not match reject
    password = crypto.createHash('sha256').update(password).digest('base64');
    if (user.password !==  password) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    // else return success
    return done(null, user);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // fix this
  var user = {'username': 'foo', 'id': '100'};
  done(null, user);
});

// routes
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/',
  passport.authenticate('local', { successRedirect: '/admin',
                                   failureRedirect: '/login'})
);

module.exports = router;
