const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("mongodb+srv://king:q1j5HiW3MTpEilDT@cluster0.cgf6byh.mongodb.net/course");

// Define schemas
const AdminSchema = new mongoose.Schema({
    "username" : String,
    "password" : String
});

const UserSchema = new mongoose.Schema({
    "username" : String,
    "password" : String,
    "purchasedCourse" : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course"
    }]
});

const CourseSchema = new mongoose.Schema({
    "title" : String,
    "description" : String,
    "price" : Number,
    "imageLink" : String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}