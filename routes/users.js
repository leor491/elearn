'use strict';

var express = require('express');
var router = express.Router();
var { body, validationResult } = require('express-validator/check');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var Student = require('../models/student');
var Instructor = require('../models/instructor');


//User Register
router.get('/register', (req, res, next) => {
	res.render('users/register', {errors: req.flash('errors')});
});

//User Register
router.post('/register', 
	[body("last_name", "Last name field is required.").exists({checkFalsy: true}),
	body("first_name", "First name field is required.").exists({checkFalsy: true}), 
	body("username", "Username field is required.").exists({checkFalsy: true}), 
	body("password", "Password field is required.").exists({checkFalsy: true}),
	body("email", "Email field is required.").exists({checkFalsy: true}),
	body("email", "Email must be in a valid format.").isEmail(),
	//body("password", "Passwords must match.").equals("password2"),
	//body("password", "Passwords must match.").matches("password2"),
	body("type", "Account type is not valid.").isIn(["student", "instructor"]),
	body("zip", "Invalid zip code.").isInt()],
	//body("zip", "Invalid zip code.").isNumber()],
	(req, res, next) => {
		var {
			type, 
			first_name, 
			last_name, 
			street_address, 
			city, 
			state, 
			zip, 
			email, 
			username, 
			password, 
			password2
		} = req.body;

		var errors = validationResult(req);

		if (!errors.isEmpty()) {
			console.info(`Cannot register: ${JSON.stringify(errors.array())}`);
			//req.flash('errors', errors.array());
			//res.location('/users/register');
			//res.redirect('/users/register');
			res.render('users/register', 
				{	errors:errors.array(), 
					type, 
					first_name, 
					last_name, 
					street_address, 
					city, 
					state, 
					zip, 
					email, 
					username
				});
		} else {
			var newUser = new User({
				username,
				email,
				password,
				type
			});

			if (type === "student") {
				var newStudent = new Student({
					first_name,
					last_name,
					address: [{
						street_address,
						city,
						state,
						zip
					}],
					username,
					email
				});

				console.info(`Saving user... ${JSON.stringify(newUser)}\n`);
				console.info(`Saving student... ${JSON.stringify(newStudent)}\n`);

				User.saveStudent(newUser, newStudent, (err, result) => {
					if(err) {
						console.error(err);
					} 

					console.info("Registered student.");
				});

			} else { //instructor
				var newInstructor = new Instructor({
					first_name,
					last_name,
					address: {
						street_address,
						city,
						state,
						zip
					},
					username,
					email
				});

				console.info(`Saving user... ${JSON.stringify(newUser)}\n`);
				console.info(`Saving instructor... ${JSON.stringify(newInstructor)}\n`);

				User.saveInstructor(newUser, newInstructor, (err, result) => {
					if(err) {
						console.error('err');
					}

					console.info("Registered instructor.");
				});
			}

			req.flash('success', 'User Added');
			//res.location('/');
			res.redirect('/');
		}
	});

//Passport Login
router.post('/login',
	passport.authenticate('local', { failureRedirect: '/', failureFlash: true, successFlash: 'Welcome!' }),
	(req, res, next) => {
		console.info(`Login user: ${JSON.stringify(req.user)}`);
		res.redirect(`/${req.user.type}s`);
	}
	);

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	User.getUserById(id, (err, user) => {
		done(err, user);
	});
});

passport.use(new LocalStrategy(
	(username, password, done) => {
		User.getUserByUsername(username, (err, user) => {
			var message = 'Invalid username or password.';

			if(err) {
				console.error(`Mongo Error: ${JSON.stringify(err)}`); 
				return done(err);//prints to page?
				//throw error;
			}

			if(!user) {
				console.info(`Invalid user: ${username}`);
				return done(null, false, { message });
			}

			User.comparePassword(password, user.password, (err, isMatch) => {
				if(err) {
					console.error(`Compare password error: ${JSON.stringify(err)}`);
					return done(err);
				}
				else if(isMatch){
					console.info(`Welcome ${username}!`);
					//req.flash('success', `Welcome ${username}!`);
					//return done(null, user, {message: "success message"});
					return done(null, user);
				}
				else {
					console.info(`Invalid password: ${username}`);
					return done(null, false, { message });
				}
			});
		});
	})
);

//Passport Logout
router.get('/logout', (req, res) => {
	console.info(`Logout:\n${JSON.stringify(req.user)}`);
	req.logout();
	req.flash('success', 'You are now logged out.');
	//res.location('/');
	res.redirect('/');
});

module.exports = router;
