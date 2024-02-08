// Middleware for handling auth
const jwt = require("jsonwebtoken");
const {secret} = require("../topSecret.json")

function adminMiddleware(req,res,next) {
    const {authorization} = req.headers;
    try {
        const isValid = jwt.verify(authorization,secret);
        if(!isValid){
            return res.status(403).json({"message" : "Please login"});
        }
        const {username} = jwt.decode(authorization);
        req.headers.username = username;
        next();
    } catch (error) {
        return res.status(400).json({"message" : "Invalid inputs"});
    }
}

module.exports = adminMiddleware;