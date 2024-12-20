const mongoose = require("mongoose");
const url = require("node:url");

const urlSchema = new mongoose.Schema({
    shortenUrl: {
        type: String,
        required: true,
        unique: [true, "Shorten url already exists"]
    },
    originalUrl: {
        type: String,
        required: [true, "Please provide a valid url"]
    },
    creator: {
        type: mongoose.Types.ObjectId,
        default: null
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    clicks: {
        type: Number,
        default: 0
    }
}, { timestamps: true, versionKey: false });

const UrlModel = mongoose.model("Url", urlSchema);

module.exports = UrlModel;