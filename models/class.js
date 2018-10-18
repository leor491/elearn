'use strict';

var mongoose = require('mongoose');

var ClassModel = function(){
	var classSchema = mongoose.Schema({
		title: {type: String},
		description: {type: String},
		instructor: {type: String},
		lessons:[{
			lesson_number: {type: Number},
			lesson_title: {type: String},
			lesson_body: {type: String}
		}]
	});

	return mongoose.model('classes', classSchema);
};

var Class = module.exports = new ClassModel();


//Fetch Limited Classes
module.exports.getClasses = function(callback, limit){
	Class.find(callback).limit(limit);
};

//Fetch Single Class
module.exports.getClassById = function(id, callback){
	Class.findById(id, callback);
};

//Add a lesson
module.exports.addLesson = function(class_id, lesson, callback){
	Class.findByIdAndUpdate(class_id, {$push: {lessons: lesson}}, 
		{ safe: true, upsert: true}, 
		callback);
};

// module.exports.findLessonById(class_id, lesson_id, callback){
// 	Class.findOne({_id: class_id, lessons._id: lesson_id})
// }