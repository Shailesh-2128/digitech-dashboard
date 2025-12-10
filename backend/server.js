const express = require("express");
const app = express();
const cors = require("cors");  
const mongoose = require("mongoose");
const formRoute = require("./routers/formRoutes");


app.use(express.json()); 

app.use(cors());


mongoose.connect("mongodb://localhost:27017/digitech-dashboard").then(()=>{
    console.log("database connected")
}).catch((err)=>{
    console.log("Error : ",err)
})

// app.use("/", formRoute);
app.use("/form", formRoute);  // Form routes (for form submission)


app.listen(8088, () => {
    console.log("Server running on port 8088");
});
