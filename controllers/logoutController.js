const userDB = require("../models/users.json");
const fsPromises = require("fs/promises");
const path = require("path");

async function logoutController(req, res) {
    //clear token
    const cookies = req.cookies;
    if (!cookies || !cookies.refresh_jwt) return res.sendStatus(200);
    const currentUser = userDB.find(
        (user) => user.refreshToken == cookies.refresh_jwt
    );

    if (!currentUser) return res.sendStatus(200);

    const newUserDB = userDB.map((user) =>
        user.refreshToken == cookies.refresh_jwt ? { ...user, refreshToken: "" } : user
    );

    await fsPromises.writeFile(
        path.join(__dirname, "..", "models", "users.json"),
        JSON.stringify(newUserDB)
    );
    res.clearCookie("refresh_jwt");
    res.sendStatus(200);
}

module.exports = logoutController;