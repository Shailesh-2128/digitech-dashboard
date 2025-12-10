const mongoose = require("mongoose");

const formSubmissionSchema = new mongoose.Schema(
    {
        clientID: {
            type: String,
            required: true
        },
        data: {
            type: mongoose.Schema.Types.Mixed,  // accepts any dynamic fields
            required: true
        }
    },
    {
        timestamps: true // createdAt, updatedAt
    }
);

const FormSubmission = mongoose.model("FormSubmission", formSubmissionSchema, "formsubmissions");

module.exports = FormSubmission;
