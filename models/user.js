'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var async = require('async');

var UserModel = function(){
	var userSchema = mongoose.Schema({
		username: {type: String},
		email: {type: String},
		password: {type: String, bcrypt: true},
		type: {type: String}
	});

	return mongoose.model('users', userSchema);
};

var User = module.exports = new UserModel();

//Get User by ID
module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
};

//Get User by Username
module.exports.getUserByUsername = function(username, callback){
	User.findOne({username}, callback);
};

//Check user password
module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch){
		// if(err) {
		// 	throw err;
		// }

		// callback(null, isMatch);

		callback(err, isMatch);
	});
};

//Create Student User
module.exports.saveStudent = function(newUser, newStudent, callback){
	bcrypt.hash(newUser.password, 10, function(err, hash){
		if(err) {
			throw err;
		}

		//Set Hash
		newUser.password = hash;

		console.info('Student is being saved:');
		console.info(`${JSON.stringify(newUser)}`);
		console.info(`${JSON.stringify(newStudent)}`);

		//Todo:
		//async.parallel([newUser.save, newStudent.save], callback);
		newUser.save(()=>{
			newStudent.save(()=>{
				callback();
			});
		});
	});
};

//Create Instructor User
module.exports.saveInstructor = function(newUser, newInstructor, callback){
	bcrypt.hash(newUser.password, 10, function(err, hash){
		if(err) {
			throw err;
		}

		//Set Hash
		newUser.password = hash;
		console.info('Instructor is being saved.');
		console.info(`${JSON.stringify(newUser)}`);
		console.info(`${JSON.stringify(newInstructor)}`);

		//Todo:
		//async.parallel([newUser.save, newInstructor.save], callback);
		newUser.save(()=>{
			newInstructor.save(()=>{
				callback();
			});
		});
	});
};