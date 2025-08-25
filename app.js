const express = require("express");
const path = require("path");
const app = express();

const { fetchAndFormatUserData } = require("./ehr");

const {
    submitNeuraPathRequisition,
} = require("./controllers/neurapath_diagnostics");

const { submitVitaSureRequisition } = require("./controllers/vitasure_labs");
const { submitQuantiaDxRequisition } = require("./controllers/quantiaDX");

let ehrData = {};

app.use(express.urlencoded({ extended: true }));

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files if needed (e.g., CSS, JS)
app.use(express.static(path.join(__dirname, "requisitions")));

app.get("/", (req, res) => {
    res.send("Dashboard");
});

// Routes to serve HTML forms with EHR data
app.get("/neurapath", (req, res) => {
    res.render('neurapath_diagnostics', { ehrData: ehrData });
});

app.get("/vitasure", (req, res) => {
    res.render('vitasure_labs', { ehrData: ehrData });
});

app.get("/quantiadx", (req, res) => {
    res.render('quantiadx', { ehrData: ehrData });
});

// POST routes to handle form submissions
app.post("/submit-neurapath", submitNeuraPathRequisition);

app.post("/submit-vitasure", submitVitaSureRequisition);

app.post("/submit-quantiadx", submitQuantiaDxRequisition);

const PORT = 3000;
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
