const express = require("express");
const adminRoute = express.Router();


adminRoute.post("/login",getAdmin)






module.exports = adminRoute;
