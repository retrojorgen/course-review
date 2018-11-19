const mongoose = require("mongoose")
mongoose.connect("mongodb://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@ds021036.mlab.com:21036/testdatabase")


const coursesSchema = new mongoose.Schema({
  name: {type: String}
})

const reviewsSchema = new mongoose.Schema({
  description: {type: String},
  stars: {type: Number, min: 1, max: 6},
  submitted: { type: Date, default: Date.now },
  userId: mongoose.Schema.Types.ObjectId,
  courseId: mongoose.Schema.Types.ObjectId
})

const usersSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  password: {type: String}
})

const Courses = mongoose.model("courses", coursesSchema)
const Reviews = mongoose.model("reviews", reviewsSchema)
const Users = mongoose.model("users", usersSchema)

function findAllCourses (callback) {
  Courses.find({}, (error, courses) => {
    if(!error)
      callback(courses);
    else
      callback(false);
  })
}

function addCourse (course, callback) {
  let newCourse = new Courses(course);
  newCourse.save(err, () => {
    if(!err)
      callback(newCourse);
    else
      calback(false);
  });
}

function findAllReviews (callback) {
  courses.find({}, (error, courses) => {
    if(!error)
      callback(courses);
    else
      callback(false);
  })
}

function addReview (review, courseId, userId, callback) {
  let newReview = new Reviews(review);
  newReview.courseId = mongoose.Types.ObjectId(courseId);
  newReview.userId = mongoose.Types.ObjectId(userId);
  newReview.save(err, () => {
    if(!err)
      callback(newCourse);
    else
      calback(false);
  });
}


function findUserByUsernameAndPassword (username, password, callback) {
  Users.findOne({username: username, password: password}, (error, user) => {
    if(!error) {
      callback(user);
    }
    else {
      callback(false);
    }
      
  })
}

module.exports = {
  findAllCourses: findAllCourses,
  findAllReviews: findAllReviews,
  addCourse: addCourse,
  addReview: addReview,
  findUserByUsernameAndPassword: findUserByUsernameAndPassword
}