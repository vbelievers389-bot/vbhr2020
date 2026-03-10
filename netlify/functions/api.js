const express = require("express");
const serverless = require("serverless-http");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const router = express.Router();

// 🔴 IMPORTANT: Increase limit for large PDF attachments
app.use(express.json({ limit: "100mb" }));  // Changed from "50mb" to "100mb"
app.use(cors());

// ... rest of your code ...
