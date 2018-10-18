'use strict';

var mongoose = require('mongoose');

var StudentModel = function(){
	var studentSchema = mongoose.Schema({
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

	return mongoose.model('students', studentSchema);
};

var Student = module.exports = new StudentModel();

module.exports.getStudentByUsername = function(username, callback) {
	Student.findOne({username}, callback);
};

module.exports.register = function(student_username, class_reg, callback){
	Student.findOneAndUpdate({username: student_username}, 
		{$push: {classes: class_reg}},
		{safe: true, upsert:true},
		callback);
};