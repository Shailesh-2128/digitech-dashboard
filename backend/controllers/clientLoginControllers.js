const Client = require("../models/clientCreationModel");  // Import Client model
const express = require("express");
const Form = require("../models/formSubmission")

async function getClient(req, res) {
    try {
        const { userName, password } = req.body;
        console.log("Received:", userName, password);

        // Find only specific fields
        const client = await Client.findOne(
            { userName, password },
            "clientID userName email"
        );

        if (!client) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        // Extract plain ID
        const clientID = client.clientID;

        // Find all form data for that client
        const formData = await Form.find({ clientID });
        console.log("Form Data:", formData);

        return res.json({
            success: true,
            message: "Login successful",
            client,
            formData
        });

    } catch (error) {
        console.log("LOGIN ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}






module.exports = {
    getClient
}