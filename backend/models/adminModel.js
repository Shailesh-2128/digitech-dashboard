const mongoose = require("mongoose")

const adminSchema = mongoose.Schema(
    {
        userName:{
            type:String,
            require:true
        }
    }
)