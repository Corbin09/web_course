const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    refreshToken : {
        type : String
    },
    role : {
        type : [String],
        default : ['100']
    }
})

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;