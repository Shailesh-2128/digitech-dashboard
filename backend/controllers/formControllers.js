const formModel = require("../models/formModels");
const FormSubmission = require("../models/formSubmission");
const Client = require("../models/clientCreationModel");

async function createForm(req, res) {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: "Name and email are required." });
        }

        await formModel.create({ name, email });

        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Error creating user: " + error.message });
    }
}

async function submitForm(req, res) {
    try {
        const { clientID, data } = req.body;  // Get clientID and form data from the request

        // Validate the form data
        if (!clientID || !data) {
            return res.status(400).json({ error: "clientID and form data are required." });
        }

        // Validate if the client with the provided clientID exists
        const client = await Client.findOne({ clientID });
        if (!client) {
            return res.status(404).json({ error: "Client not found." });
        }

        // Create a new form submission and associate it with the client
        const newFormSubmission = await FormSubmission.create({
            clientID: client.clientID,  // Use the clientID from the Client model (UUID)
            data
        });

        return res.status(201).json({
            message: "Form submitted successfully",
            formSubmission: newFormSubmission
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error submitting form: " + error.message });
    }
}






module.exports = {
    createForm,
    submitForm
};
