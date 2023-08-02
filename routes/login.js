const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginContrller");

router.post("/", loginController);

module.exports = router;