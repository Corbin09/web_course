const router = require('express').Router();
const logoutController = require("../controllers/logoutController");

router.get("/", logoutController);

module.exports = router;