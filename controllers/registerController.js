const bcrypt = require("bcrypt");
// const userDB = require("../models/users.json");
// const path = require("path");
// const fsPromises = require("fs/promises");
const UserModel = require("../models/UserModel");

const registerController = async (req, res) => {
    const { username, password } = req.body;

    const foundUser = await UserModel.findOne({username});

    if(!!foundUser) return res.sendStatus(409);

    if (!username || !password)
        return res
            .status(400)
            .json({ message: 'Username and password are required' });
    // if(userDB.find(user => user.username == username)){
    //     return res.sendStatus(409);
    // }
    const hashedPassword = await bcrypt.hash(password, 5);

    //console.log(hashedPassword);

    const newUser = {
        username,
        password: hashedPassword,
    }; 

    await UserModel.create(newUser);
    
    // userDB.push(newUser);
    // fsPromises.writeFile(path.join(__dirname,'..','models','users.json'), JSON.stringify(userDB));

    

    res.sendStatus(201);
}

module.exports = registerController;