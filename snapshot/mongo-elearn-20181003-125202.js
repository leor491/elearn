
/** classes indexes **/
db.getCollection("classes").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** instructors indexes **/
db.getCollection("instructors").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** students indexes **/
db.getCollection("students").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** users indexes **/
db.getCollection("users").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** classes records **/
db.getCollection("classes").insert({
  "_id": ObjectId("5b999105212b1ddfc8a35577"),
  "title": "Intro to HTML5",
  "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis",
  "instructor": "John Doe"
});
db.getCollection("classes").insert({
  "_id": ObjectId("5b999146212b1ddfc8a35578"),
  "title": "Advanced PHP",
  "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis",
  "instructor": "Jane Doe"
});
db.getCollection("classes").insert({
  "_id": ObjectId("5b999190212b1ddfc8a35579"),
  "title": "Intro to Photoshop",
  "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis",
  "instructor": "John Smith"
});

/** instructors records **/
db.getCollection("instructors").insert({
  "_id": ObjectId("5bb51d61401538188244636f"),
  "first_name": "instructor_fn",
  "last_name": "instructor_ln",
  "address": [
    {
      "_id": ObjectId("5bb51d614015381882446370"),
      "street_address": "instructor_sa",
      "city": "instructor_cty",
      "state": "instructor_st",
      "zip": NumberInt(93765)
    }
  ],
  "username": "instructor123",
  "email": "instructor@email.com",
  "classes": [
    
  ],
  "__v": NumberInt(0)
});

/** students records **/
db.getCollection("students").insert({
  "_id": ObjectId("5bb51c43401538188244636c"),
  "first_name": "student_fn",
  "last_name": "student_ln",
  "address": [
    {
      "_id": ObjectId("5bb51c43401538188244636d"),
      "street_address": "student_sa",
      "city": "student_cty",
      "state": "student_st",
      "zip": NumberInt(29573)
    }
  ],
  "username": "student123",
  "email": "student@email.com",
  "classes": [
    
  ],
  "__v": NumberInt(0)
});

/** users records **/
db.getCollection("users").insert({
  "_id": ObjectId("5bb51c43401538188244636b"),
  "username": "student123",
  "email": "student@email.com",
  "password": "$2a$10$ZLEeMqCJq1kubmGgSKBfe.UOw8cLBP1xAyhArNZ6dFT6ZKjZHUQfG",
  "type": "student",
  "__v": NumberInt(0)
});
db.getCollection("users").insert({
  "_id": ObjectId("5bb51d61401538188244636e"),
  "username": "instructor123",
  "email": "instructor@email.com",
  "password": "$2a$10$iJx1SoQHWQcRRKYqXtq/zO76V3FsQNI51flXGVzb4PxllkTCEBuQC",
  "type": "instructor",
  "__v": NumberInt(0)
});
