const router = require('express').Router();
const refreshController = require("../controllers/refreshController");


router.get('/', refreshController);

module.exports = router