var express = require('express');
var http = require('http');
var https = require('https');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var passport = require('passport');
//var passportLocal = require('passport-local');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

// mongodb connection
// require Message model
// create new model with mongoose connection
// pass connected model into the router
// for operations
//
// maybe can do all this 
// in a cleaner way
mongoose.connect('mongodb://localhost/fuerzadlb');
var Messages = require('./models/messages');
var messageModel = new Messages({db: mongoose});
var messages = require('./routes/messages')(messageModel);

// routes
var routes = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');


// start app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//// setting up passport ////
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

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

app.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

app.post('/login',
  passport.authenticate('local', { successRedirect: '/admin',
                                   failureRedirect: '/login'})
);
////////////////////////

app.use('/', routes);
app.use('/users', users);
app.use('/admin', admin);
app.use('/messages', messages);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//app.listen(3000);
http.createServer(app).listen(3000);

/*
 *
 * https://devcenter.heroku.com/articles/ssl-certificate-self
 * http://greengeckodesign.com:8880/blog/2013/06/15/creating-an-ssl-certificate-for-node-dot-js/
 */
var sslOptions = {
  key: fs.readFileSync('./ssl/server.key'),
  cert: fs.readFileSync('./ssl/server.crt'),
  requestCert: true,
  rejectUnauthorized: false
};

https.createServer(sslOptions, app).listen(3001);
