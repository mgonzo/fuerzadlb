var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// setup passport
router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy(
function(username, password, done) {
  var User = {
  'username': 'foo',
  'password': 'bar'
  };

  if (password === User.password) {
    console.log(password);
    console.log(User.password);
    var user = {'username': 'foo', 'id': '100'};
    return done(null, user);
  } else {
    console.log(password);
    console.log(User.password);
    return done(null, false, { message: 'Incorrect password.' });
  }
}
));

passport.serializeUser(function(user, done) {
done(null, user.id);
});

passport.deserializeUser(function(id, done) {
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
