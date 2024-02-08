const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const jwt = require('jsonwebtoken');
const {secret} = require("../topSecret.json");

const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    const {username, password} = req.body;

    const isExist = await Admin.findOne({username});
    if(isExist){
        return res.status(400).json({"message" : "Admin already exist"});
    }
    const newAdmin = new Admin({
        username,
        password
    })
    await newAdmin.save();

    const token = jwt.sign({username}, secret);
    res.status(201).json({"message" : "Admin created succesfully","token":token});
});

router.post('/signin', async (req,res)=>{
    const {username, password} = req.body;

    const isExist = await Admin.findOne({username, password});
    if(!isExist){
        return res.status(400).json({"message" : "Email or password wrong"});
    }

    const token = jwt.sign({username}, secret);
    res.status(201).json({"message" : "Signin succesfully","token":token});
})

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