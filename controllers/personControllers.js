const persons = require("../models/persons.json");

const getAllPerson = (req, res) => {
    res.send(persons);
};

const createPerson = (req, res) => {
    const { name } = req.body;

    res.json("create person");
};

const updatePerson = (req, res) => {
    const { name } = req.body;
    
    res.json("update person");
};

const deletePerson = (req, res) => {
    const { name } = req.body;
    res.json("deleted person");
};


module.exports = { getAllPerson, createPerson, updatePerson, deletePerson};