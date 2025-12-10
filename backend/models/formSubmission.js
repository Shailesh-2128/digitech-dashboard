const mongoose = require("mongoose");

// Define the FormSubmission schema
const formSubmissionSchema = mongoose.Schema(
    {
        clientID: { 
            type: String,  // Store clientID as a string (UUID)
            required: true
        },
        data: { 
            type: mongoose.Schema.Types.Mixed,  // Flexible data type to store any data structure
            required: true
        }
    },
    { timestamps: true }
);


// Create the FormSubmission model
const FormSubmission = mongoose.model("FormSubmission", formSubmissionSchema);

module.exports = FormSubmission;
