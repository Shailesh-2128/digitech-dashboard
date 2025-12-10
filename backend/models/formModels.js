const mongoose = require("mongoose");

const formSchema = mongoose.Schema(
    {
        clientID: { 
            type: String,
            required: true 
        },
        data: { 
            type: String,
            required: true 
        }
    },
    { timestamps: true }
);

// Ensure the model is using 'forms' as the collection name
const formModel = mongoose.model("Form", formSchema); 

module.exports = formModel;

