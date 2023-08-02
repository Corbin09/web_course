const userDB = require("../models/users.json");
const jwt = require("jsonwebtoken");

const refreshController = (req, res, next) => {
    const refresh_jwt = req.cookies?.refresh_jwt;
    if(!refresh_jwt) return res.sendStatus(401);

    const currentUser = userDB.find((user) => user.refreshToken == refresh_jwt);

    if(!currentUser) return res.sendStatus(401);
    // console.log(currentUser);
    try{
        const decoded = jwt.verify(refresh_jwt, process.env.SECRET_KEY_REFRESH);

        // console.log(decoded);
        
        if(decoded.username != currentUser.username){
            res.sendStatus(401);
        }
        const token = jwt.sign(
            {
                user : {
                    username: currentUser.username,
                role: currentUser.role,
                },
            },
            process.env.SECRET_KEY_TOKEN,
            {
                expiresIn: "20s",
            }
        );
        res.json(token);
    } catch (e) {
        res.status(500).json({massage: e.massge});
    }
};


module.exports = refreshController;