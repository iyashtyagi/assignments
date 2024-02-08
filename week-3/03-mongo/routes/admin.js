const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin, Course} = require("../db");
const router = Router();


// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const {username, password} = req.body;
    const isExist = await Admin.findOne({username : username});
    if(isExist){
        return res.status(400).json({"message" : "User already exist"});
    }
    const newAdmin = new Admin({
        "username" : username,
        "password" : password
    })
    await newAdmin.save();
    res.status(201).json({"message" : "Admin created succesfully"});
});

router.post('/courses', adminMiddleware, async (req, res) => {
    const {title , description, price, imageLink} = req.body;

    const newCourse = new Course({
        title,
        description,
        price,
        imageLink
    })
    const {_id} = await newCourse.save();
    res.status(201).json({"message":"Course created successfully", "courseId":_id.toString()})
});

router.get('/courses', adminMiddleware, async (req, res) => {
    const courses = await Course.find()
    res.status(200).json({courses})
});

module.exports = router;