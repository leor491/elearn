'use strict';

var express = require('express');
var router = express.Router();

var Instructor = require('../models/instructor');
var Class = require('../models/class');

router.get('/', (req, res, next) => {
	Instructor.getInstructorByUsername(req.user.username, (err, instructor) => {
		if(err) {
			console.error(err);
			res.end();
		} else {
			res.render('instructors/details', { success: req.flash('success'), instructor });
		}
	});
});

//Register instructor to teach a class
//use passport?
router.post('/register', (req, res, next) => {
	//can it be a student?
	//user req.user?
	//info['instructor_username'] = req.body.username;
	//type must be instructor
	var {class_id, class_title} = req.body;
	var class_reg = {class_id, class_title};
	var instructor_username = req.user.username;

	console.info(`INFO: ${instructor_username}, ${JSON.stringify(class_reg)}`);

	Instructor.register(instructor_username, class_reg, (err, instructor) => {
		if(err) {
			console.error(err);
			res.end();
		}
		else {
			console.info(instructor);
			req.flash('success', 'You are now registered to teach this class.');
			//res.location('/instructors');
			res.redirect('/instructors');
		}
	});
});

router.get('/lessons/new/:class_id', (req, res, next) => {
	res.render('instructors/new_lesson', { class_id: req.params.class_id });
});

//Limited to instructors?
router.post('/lessons/new/:class_id', (req, res, next) => {
	var {class_id} = req.params;
	var {lesson_title, lesson_number, lesson_desc} = req.body;
	
	Class.addLesson(class_id, {lesson_title, lesson_number, lesson_desc}, (err, result) => {
		if(err) {
			console.error(err);
			res.end();
		} else {
			console.info(result);
			req.flash('success', 'Lesson had been added.');
			//res.location('/instructors');
			res.redirect('/instructors');
		}
	});
});

module.exports = router;