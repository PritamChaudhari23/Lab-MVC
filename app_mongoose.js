// ========== Express App with Mongoose Integration ==========

const express = require("express");
const path = require("path");
const connectDB = require("./config/database");
const app = express();

const { fetchAndFormatUserData } = require("./ehr");

const {
    submitNeuraPathRequisition,
} = require("./controllers-mongoose/neurapath_diagnostics");

const { submitVitaSureRequisition } = require("./controllers-mongoose/vitasure_labs");
const { submitQuantiaDxRequisition } = require("./controllers-mongoose/quantiaDX");

let ehrData = {};

app.use(express.urlencoded({ extended: true }));

// Set EJS as template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (CSS, JS, static HTML)
app.use(express.static(path.join(__dirname, "requisitions")));

// Dashboard route
app.get("/", (req, res) => {
    res.send("Dashboard");
});

// ========== EJS-Based Routes (Dynamic) ==========

app.get("/neurapath", (req, res) => {
    res.render("neurapath_diagnostics", { ehrData: ehrData });
});

app.get("/vitasure", (req, res) => {
    res.render("vitasure_labs", { ehrData: ehrData });
});

app.get("/quantiadx", (req, res) => {
    res.render("quantiadx", { ehrData: ehrData });
});

// ========== Static Routes (sendFile-based) ==========
// These are just for testing or static version comparison

app.get("/neurapath-static", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "requisitions",
            "Neurapath_diagnostics",
            "Neurapath_diagnostics.html",
        ),
    );
});

app.get("/vitasure-static", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "requisitions",
            "Vitasure_labs",
            "Vitasure_labs.html",
        ),
    );
});

app.get("/quantiadx-static", (req, res) => {
    res.sendFile(
        path.join(__dirname, "requisitions", "QuantiaDx", "QuantiaDx.html"),
    );
});

// ========== POST Routes ==========

app.post("/submit-neurapath", submitNeuraPathRequisition);
app.post("/submit-vitasure", submitVitaSureRequisition);
app.post("/submit-quantiadx", submitQuantiaDxRequisition);

// ========== Server Startup ==========

const PORT = 3000;

// Connect to Database
connectDB();

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);

    // Load EHR data on startup
    console.log("Loading EHR data...");
    ehrData = await fetchAndFormatUserData();
    if (ehrData) {
        console.log("EHR data loaded successfully");
    } else {
        console.log("Failed to load EHR data");
    }
});