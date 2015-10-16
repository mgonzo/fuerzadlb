var express = require('express');
var https = require('https');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

var UUID = require('./helpers/uuid');
var uuid = new UUID();

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
var login = require('./routes/login');

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

// session setup
app.use(session({ 
  getid: function () {
    return uuid.getNewId();
  },
  secret: process.env.FDLB_SECRET
}));

app.use('/', routes);
app.use('/users', users);
app.use('/admin', admin);
app.use('/messages', messages);
app.use('/login', login);

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

https.createServer(sslOptions, app).listen(3000);
