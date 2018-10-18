'use strict';

var express = require('express');
var router = express.Router();

var Class = require('../models/class');

/* GET classes page. */
router.get('/', (req, res, next) => {
	Class.getClasses((err, classes) => {
		if(err) {
			console.error(err);
			res.end();
		} else {
			res.render('classes/index', {classes, errors: req.flash('errors')});
		}
	}, 20);
});

/* GET class details. */
router.get('/details/:id', (req, res, next) => {
	Class.getClassById(req.params.id, (err, class_d) => {
		if(err) {
			console.error(err);
			res.end();
		} else {
			res.render('classes/details', {class: class_d, details: true});
		}
	});
});

/* GET class lessons. */
router.get('/:class_id/lessons', (req, res, next) => {
	Class.getClassById(req.params.class_id, (err, class_d) => {
		if(err) {
			console.error(err);
			res.end();
		} else {
			res.render('classes/lessons', {class: class_d, details: true});
		}
	});
});

/* GET class lesson by id. */
router.get('/:class_id/lessons/:lesson_id', (req, res, next) => {
	Class.getClassById(req.params.class_id, (err, class_d) => {
		if(err) {
			console.error(err);
			res.end();
		} else {
			//Do in query?
			var lesson = class_d.lessons.find((value) => {
				return value._id == req.params.lesson_id;
			});

			res.render('classes/lesson', {lesson, class_id: class_d._id, details: true});
		}
	});
});

module.exports = router;