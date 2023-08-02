require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT ?? 9303;
const path = require("path");
const connectDB = require("./config/connectDb");
const mongoose = require("mongoose");
const handleVerifyJWT = require("./middlewares/handleVerifyJWT");
const cookieParser = require("cookie-parser");
const verifyRole = require("./middlewares/verifyRole");

//connect
connectDB();

//middleware static files
app.use(express.static(path.join(__dirname, "public")));
//server json body
app.use(express.json());
//serve cookie
app.use(cookieParser());

//routes

app.use("/", require("./routes/root"));
app.use("/login", require("./routes/login"));
app.use("/register", require("./routes/register"));
app.use("/refreshToken", require("./routes/refreshToken"));
app.use("/logout", require("./routes/logout"));
//verify jwt
app.use(handleVerifyJWT);
app.use("/persons", require("./routes/persons"));


mongoose.connection.once("open", () => {
    console.log(`connect db success`);
    app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
})