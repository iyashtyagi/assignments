const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

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

    res.status(201).json({"message" : "User created succesfully"});
});

router.get('/courses',userMiddleware ,async (req, res) => {
    const allCourses = await Course.find();
    res.status(200).json({"courses":allCourses});
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const {courseId} = req.params;
    const {username} = req.headers;
    const user = await User.findOne({username});
    console.log(user);
    await User.updateOne({username},{
        "$push" : {
            "purchasedCourse" : courseId
        }
    })
    const user2 = await User.findOne({username});
    console.log(user2);
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const {username} = req.headers;
    const user =  await User.findOne({username}).populate("purchasedCourse");
    const purchasedCourses = user.purchasedCourse;
    res.status(200).json({purchasedCourses});
});

module.exports = router