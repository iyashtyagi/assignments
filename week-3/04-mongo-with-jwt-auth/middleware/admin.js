// Middleware for handling auth
const jwt = require("jsonwebtoken");
const {secret} = require("../topSecret.json")

function adminMiddleware(req, res, next) {
    const {authorization} = req.headers.authorization;
    const isOk = jwt.verify(authorization)
}

console.log(secret);
module.exports = adminMiddleware;