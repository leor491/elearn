'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
//var bodyparser = require('body-parser');

var mongo = require('mongodb');
var mongoose = require('mongoose');
//bitnami
var db = mongoose.connect('mongodb://localhost:27017/elearn', { useNewUrlParser: true });

var index = require('./routes/index');
var users = require('./routes/users');
var classes = require('./routes/classes');
var students = require('./routes/students');
var instructors = require('./routes/instructors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//Todo: Parameterize environment
app.use(logger('dev'));

// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Handle Sessions
app.use(session(
{
	//Todo: remove secrets?
	secret: 'secret',
	saveUninitialized: true,
	resave:true
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());


//Express Validation
app.use(expressValidator({
  errorFormatter: function(param, msg, value){
    var namespace = param.split('.');
    var root = namespace.shift();
    var formParam = root;

    while(namespace.length){
      formParam += `[${namespace.shift()}]`;
    }

    return {
      param: formParam,
      msg,
      value
    };
  }
}));

//Conenct Flash
app.use(flash());

//Express Messages
/*
app.use(function (req, res, next) {
  //Express-Validator
  //res.locals.success = req.flash('success');
  //res.locals.errors = req.flash(errors.toArray());

  //Passport
  //res.locals.error = req.flash(error);
  
  res.locals.messages = require('express-messages')(req, res);
  next();
});
*/

//Routers
app.use('/', index);
app.use('/users', users);
app.use('/classes', classes);
app.use('/students', students);
app.use('/instructors', instructors);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //var err = new Error('Not Found');
  var err = new Error(`404 Page Not found: ${req.originalUrl}`);
  err.status = 404;
  next(err);
});


//Todo: most likely crappy code.
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.error(err.stack);

  // render the error page
  //Todo: how to get 500 in here?
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
