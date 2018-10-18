'use strict';

var express = require('express');
var router = express.Router();

var Class = require('../models/class');

/* GET latest classes for partial. */
router.get('*', function(req, res, next) {
  Class.getClasses(function(err, latest_classes) {
    if(err) {
      console.log(err);
    }

    res.app.locals.latest_classes = latest_classes;
    res.locals.user = req.user || null;

    /*if(req.user) {
    	res.locals.type = req.user.type;
    }*/

    next();
  }, 3);
});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {success: req.flash("success"), error: req.flash('error')});
});

module.exports = router;