const bcrypt = require("bcrypt");
const userDB = require("../models/users.json");
const { connect } = require("mongoose");
const jwt = require("jsonwebtoken");
const path = require("path")
const fsPromises = require("fs/promises");
const { log } = require("console");

const loginController = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res
            .status(400)
            .json({ message: "Username and password are required" });
    };

    const currentUser = userDB.find((user) => user.username == username);

    if (!currentUser)
        return res
            .status(404)
            .json({ message: `${username} is not created` });

    const matchedPassword = await bcrypt.compare(password, currentUser.password);

    //console.log(matchedPassword);

    if (matchedPassword) {
        //creat jwt

        const token = jwt.sign(
            {
                user : {
                    username: currentUser.username,
                role: currentUser.role,
                },
            },
            process.env.SECRET_KEY_TOKEN,
            {
                expiresIn: "1h",
            }
        );

        //refresh token
        const refreshToken = jwt.sign(
            {
                username: currentUser.username,
            },
            process.env.SECRET_KEY_REFRESH,
            {
                expiresIn: "21d",
            }
        );
        // console.log(refreshToken);

        currentUser.refreshToken = refreshToken;
        // console.log(currentUser);

        const newUserDB = userDB.filter(user => user.username != currentUser.username)
        newUserDB.push(currentUser);

        // console.log(newUserDB);
        await fsPromises.writeFile(path.join(__dirname,"..","models","users.json"),JSON.stringify(newUserDB));
        res.cookie('refresh_jwt', refreshToken);
        res.status(200).json(token);
    }
    else {
        res.sendStatus(401);
    }
}

module.exports = loginController;