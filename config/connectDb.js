const mongoose = require('mongoose')

const connectDB = async () =>{
    try{
        const res = await mongoose.connect(process.env.DATABASE_URI);
        // console.log(res);
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = connectDB;