const express = require("express")
const clientRoute = express.Router()
const {getClient} = require("../controllers/clientLoginControllers")

clientRoute.post("/login",getClient)

module.exports = clientRoute