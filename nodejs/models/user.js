const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");
const { ObjectId } = mongoose.Schema;


const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        address: {
            type: String,
            trim: true,
            required: true,
            maxlength: 150
        },
        contact: {
            type: String,
            trim: true,
            required: true,
            maxlength: 15
        },
        email: {
            type: String,
            trim: true,
            required: true
        },
        photo: {
            data: Buffer,
            contentType: String
        }
    },
    { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);