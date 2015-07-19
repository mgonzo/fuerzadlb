var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// routes
var routes = require('./routes/index');
var users = require('./routes/users');

// start app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// mongodb connection
mongoose.connect('mongodb://localhost/fuerzadlb');
var Messages = require('./node_modules/messages');
var messages = new Messages({db: mongoose});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.post('/contact', function (req, res, next) {
  var message = JSON.parse(JSON.stringify(req.body));
  console.log(message);
  console.log(message.email);

  messages.createMessage({
      email: message.email,
      phone: message.phone,
      lname: message.lname,
      fname: message.fname,
      body: message.body
    }, function (message) {
      res.end(JSON.stringify(message));
  });
});

app.get('/contact', function (req, res, next) {
  messages.readAllMessages(function (messages) {
    res.end(JSON.stringify(messages));
  });
});

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

app.listen(3000);

