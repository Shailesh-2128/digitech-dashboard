// const formModel = require("../models/formModels");
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
        const clientID = req.params.clientID;   // FIXED
        const data = req.body;                 // whole body = dynamic fields

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ error: "Form data must not be empty." });
        }

        const client = await Client.findOne({ clientID });
        if (!client) {
            return res.status(404).json({ error: "Client not found." });
        }

        const newFormSubmission = await FormSubmission.create({
            clientID,
            data
        });

        return res.status(201).json({
            message: "Form submitted successfully.",
            formSubmission: newFormSubmission
        });

    } catch (error) {
        console.error("Error submitting form:", error);
        return res.status(500).json({
            error: "Internal Server Error",
            details: error.message
        });
    }
}








module.exports = {
    createForm,
    submitForm
};
