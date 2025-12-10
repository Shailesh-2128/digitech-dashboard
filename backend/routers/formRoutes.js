const express = require("express");
const route = express.Router();
const { createForm } = require("../controllers/formControllers"); 
const { submitForm } = require("../controllers/formControllers");
const {createClient} = require("../controllers/clientControllers");
const {getAllClients} = require("../controllers/clientControllers");



route.get("/form", (req, res) => {
    return res.send("form api");
});

route.get("/getClient", getAllClients);  



route.post("/form", createForm); 
route.post("/client",createClient)
route.post("/form/:clientID", submitForm);  // clientID is part of the URL



module.exports = route;
