const express = require('express');
const router = express.Router();
const path = require("path");
const fsPromises = require("fs/promises");

router.get('/', async (req, res) => {
    const data = await fsPromises.readFile(path.join(__dirname, "..", "views", "index.html"), "utf8");
    res.send(data);
});

module.exports = router;