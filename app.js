const express = require("express");
const path = require("path");
const app = express();

const { fetchAndFormatUserData } = require("./ehr");

const {
    submitNeuraPathRequisition,
} = require("./controllers/neurapath_diagnostics");

const { submitVitaSureRequisition } = require("./controllers/vitasure_labs");
const { submitQuantiaDxRequisition } = require("./controllers/quantiaDX");


app.use(express.urlencoded({ extended: true }));

// Serve static files if needed (e.g., CSS, JS)
app.use(express.static(path.join(__dirname, "requisitions")));

app.get("/", (req, res) => {
    res.send("Dashboard");
});

// Routes to serve HTML forms
app.get("/neurapath", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "requisitions",
            "Neurapath_diagnostics",
            "Neurapath_diagnostics.html",
        ),
    );
});

app.get("/vitasure", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "requisitions",
            "Vitasure_labs",
            "Vitasure_labs.html",
        ),
    );
});

app.get("/quantiadx", (req, res) => {
    res.sendFile(
        path.join(__dirname, "requisitions", "QuantiaDx", "QuantiaDx.html"),
    );
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
    const ehrData = await fetchAndFormatUserData();
    if (ehrData) {
        console.log("EHR data loaded successfully");
    } else {
        console.log("Failed to load EHR data");
    }
});
