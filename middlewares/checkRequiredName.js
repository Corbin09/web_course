const { model } = require("mongoose");

const checkRequiredName = (req, res, next) =>{
    const {name} = req.body;
    if(!name) return res.status(400).json({});
    next();
};

module.exports = checkRequiredName;