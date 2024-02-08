const {User} = require("../db");

async function userMiddleware(req, res, next) {
    try {
        const {username} = req.headers;
        const isExist = await User.findOne({username});
        if(!isExist){
            return res.status(403).json({"message" : "Not allowed"});
        }
        next();
    } catch (error) {
        res.status(500).json({"message":"Internal server error"})
    }
}

module.exports = userMiddleware;