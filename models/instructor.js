'use strict';

var mongoose = require('mongoose');

var InstructorModel = function(){
	var instructorSchema = mongoose.Schema({
		first_name: {type: String},
		last_name: {type: String},
		address: [{
			street_address: {type: String},
			city: {type: String},
			state: {type: String},
			zip: {type: Number}
		}],
		username: {type: String},
		email: {type: String},
		classes: [{
			class_id: {type: mongoose.Schema.Types.ObjectId},
			class_title: {type: String}
		}]
	});

	return mongoose.model('instructors', instructorSchema);
};

var Instructor = module.exports = new InstructorModel();

module.exports.getInstructorByUsername = function(username, callback) {
	Instructor.findOne({username}, callback);
};

module.exports.register = function(instructor_username, class_reg, callback){
	Instructor.findOneAndUpdate({username: instructor_username}, 
		{$push: {classes: class_reg}},
		{safe: true, upsert:true},
		callback);
};