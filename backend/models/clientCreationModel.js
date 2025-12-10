const mongoose = require("mongoose")
const {v4:uuidv4} = require("uuid")

const clientSchema = mongoose.Schema(
    {
        clientID: { 
            type: String, 
            required: true, 
            default: uuidv4  // Automatically generate clientID using uuid (UUID v4)
        },
        userName: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true  // Ensure unique email for each client
        },
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

// Create the Client model
const Client = mongoose.model("Client", clientSchema);

module.exports = Client;