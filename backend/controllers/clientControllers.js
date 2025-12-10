const Client = require("../models/clientCreationModel");  // Import Client model
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

async function createClient(req, res) {
    try {
        const { userName, email, password } = req.body;

        // Validate input
        if (!userName || !email || !password) {
            return res.status(400).json({ error: "userName, email, and password are required." });
        }

        // Check if the client already exists
        const existingClient = await Client.findOne({ email });
        if (existingClient) {
            return res.status(400).json({ error: "Email already registered." });
        }

        // Generate a new clientID using uuid
        const clientID = uuidv4();

        // Create a new client
        const newClient = new Client({
            userName,
            email,
            password,  // In production, make sure to hash the password
            clientID
        });

        // Save the new client to the database
        await newClient.save();

        // Now dynamically create the form API endpoint for this clientID
        // Use Express to dynamically create a route for form submissions
        router.post(`/form/${clientID}`, async (req, res) => {
            const { data } = req.body;

            if (!data) {
                return res.status(400).json({ error: "Form data is required." });
            }

            // Handle form submission logic here, e.g., save form data to the database
            // In this example, we are just returning a success message.
            return res.status(200).json({
                message: `Form submitted successfully for client ${clientID}`,
                formData: data
            });
        });

        // Respond to the client with their `clientID` and a link to their dynamic form endpoint
        return res.status(201).json({
            message: "Client created successfully",
            clientID: newClient.clientID,
            formAPI: `/form/${clientID}`  // Provide the client with the link to their form API
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error creating client: " + error.message });
    }
}
 
async function getAllClients(req, res) {
    try {
        const clients = await Client.find({}).select('clientID userName'); 
        return res.status(200).json(clients);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching clients: " + error.message });
    }
}


module.exports = {
    createClient,
    getAllClients
};
