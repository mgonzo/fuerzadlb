var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// apps
// need to include nodemailer
// and maybe call a bash script
// to encrypt email contents with gpg
// http://stackoverflow.com/questions/27439201/can-sns-send-encrypted-email
// then send the email from the email
// with a specified subject line
// and the encrypted body
var transporter = nodemailer.createTransport({
  service: 'Gmail',
    auth: {
      user: process.env.MAIL_USER,
      password: process.env.MAIL_PASS
    }
});

var mailOptions = {
  from: '',
  to: '',
  subject: 'test',
};

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

app.use('/', routes);
app.use('/users', users);

app.use('/contact', function (req, res, next) {
  mailOptions.text = 'this is a test mail';
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      return console.log(err);
    }
    console.log('Message sent: ' + info.response);
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

