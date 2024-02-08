const {Admin} = require("../db") 
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    try {
        const {username} = req.headers;
        const isExist = await Admin.findOne({username : username});
        if(!isExist){
            return res.status(403).json({"message":"not allowed"});
        }
        next();
    } catch (error) {
        res.status(500).json({"message" : "Internal server error"});
    }
}

module.exports = adminMiddleware;