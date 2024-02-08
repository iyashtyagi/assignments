const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require('jsonwebtoken');
const {secret} = require("../topSecret.json");

const router = Router();

// User Routes
router.post('/signup', async (req, res) => {
    const {username, password} = req.body;

    const isExist = await User.findOne({username});
    if(isExist){
        return res.status(400).json({"message" : "User already exist"});
    }
    const newUser = new User({
        username,
        password
    })
    await newUser.save();

    const token = jwt.sign({username}, secret);
    res.status(201).json({"message" : "User created succesfully","token":token});
});

router.post('/signin', async (req,res)=>{
    const {username, password} = req.body;

    const isExist = await User.findOne({username, password});
    if(!isExist){
        return res.status(400).json({"message" : "Email or password wrong"});
    }

    const token = jwt.sign({username}, secret);
    res.status(201).json({"message" : "Signin succesfully","token":token});
})

router.get('/courses',userMiddleware ,async (req, res) => {
    const allCourses = await Course.find();
    res.status(200).json({"courses":allCourses});
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const {courseId} = req.params;
    const {username} = req.headers;
    const user = await User.findOne({username});
    await User.updateOne({username},{
        "$push" : {
            "purchasedCourse" : courseId
        }
    })
    res.status(201).json({ message: 'Course purchased successfully' })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const {username} = req.headers;
    const user =  await User.findOne({username}).populate("purchasedCourse");
    const purchasedCourses = user.purchasedCourse;
    res.status(200).json({purchasedCourses});
});

module.exports = router