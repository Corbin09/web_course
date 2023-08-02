const express = require("express");
const router = express.Router();
const persons = require("../models/persons.json");
const { getAllPerson, createPerson, updatePerson, deletePerson} = require("../controllers/personControllers");
const verifyRole = require("../middlewares/verifyRole");
const ROLES = require("../constants/roles");


//user, admin
router.get("/", verifyRole(ROLES.USER), getAllPerson);


//admin
router.use(verifyRole(ROLES.ADMIN));
router.post("/", createPerson);
router.put("/", updatePerson);
router.delete("/", deletePerson);

module.exports = router;