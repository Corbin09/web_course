const jwt = require("jsonwebtoken");
const userDB = require("../models/users.json");

const handVerifyJWT = (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")?.[1];
    if (!token) return res.sendStatus(401);
    try {
        const {
            user : {username, role},
         } = jwt.verify(token, process.env.SECRET_KEY_TOKEN);

        // console.log(username, role);
        // console.log("running");
        const currentUser = userDB.find(user => username == username)
        if (!currentUser) return res.sendStatus(401);
        req.role = role;
        next();
    }
    catch (e) {
        res.status(401).json({message:  e.message});
    }
}

module.exports = handVerifyJWT;