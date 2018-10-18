'use strict';

var express = require('express');
var router = express.Router();

var Student = require('../models/student');

router.get('/', (req, res, next) => {
	Student.getStudentByUsername(req.user.username, (err, student) => {
		if(err) {
			console.error(err);
			res.end();
		} else {
			res.render('students/details', { success: req.flash('success') , student });
		}
	});	
});


//Enroll student in class.
//use passport?
router.post('/register', (req, res, next) => {
	//can it be an instructor?
	//use req.user?
	//type must be student
	var {class_id, class_title} = req.body;
	var class_reg = {class_id, class_title};
	var student_username = req.user.username;

	console.info(`INFO: ${student_username}, ${JSON.stringify(class_reg)}`);

	Student.register(student_username, class_reg, (err, student) => {
		if(err) {
			console.error(err);
			res.end();
		}
		else {
			console.info(student);
			req.flash('success', 'You are now registered to teach this class.');
			//res.location('/students');
			res.redirect('/students');
		}
	});
});

module.exports = router;