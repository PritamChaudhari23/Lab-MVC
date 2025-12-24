const express = require("express");
const path = require("path");
const { fetchAndFormatUserData } = require("./ehr");

const {
  submitNeuraPathRequisition,
} = require("./controllers-mongoose/neurapath_diagnostics");
const {
  submitVitaSureRequisition,
} = require("./controllers-mongoose/vitasure_labs");
const {
  submitQuantiaDxRequisition,
} = require("./controllers-mongoose/quantiaDX");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set EJS as template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (CSS, JS, static HTML)
app.use(express.static(path.join(__dirname, "requisitions")));

// Dashboard route
app.get("/", (req, res) => {
  res.send("Dashboard");
});

// ========== Dummy Static Routes (sendFile-based) ==========
app.get("/neurapath-static", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "requisitions",
      "Neurapath_diagnostics",
      "Neurapath_diagnostics.html"
    )
  );
});

app.get("/vitasure-static", (req, res) => {
  res.sendFile(
    path.join(__dirname, "requisitions", "Vitasure_labs", "Vitasure_labs.html")
  );
});

app.get("/quantiadx-static", (req, res) => {
  res.sendFile(
    path.join(__dirname, "requisitions", "QuantiaDx", "QuantiaDx.html")
  );
});

// ========== EJS-Based Routes (Dynamic) ==========

app.get("/neurapath", async (req, res) => {
  try {
    const ehrData = await fetchAndFormatUserData();
    res.render("neurapath_diagnostics", { ehrData });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to load EHR data");
  }
});

app.get("/vitasure", async (req, res) => {
  try {
    const ehrData = await fetchAndFormatUserData();
    res.render("vitasure_labs", { ehrData });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to load EHR data");
  }
});

app.get("/quantiadx", async (req, res) => {
  try {
    const ehrData = await fetchAndFormatUserData();
    res.render("quantiadx", { ehrData });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to load EHR data");
  }
});

// ========== POST Routes ==========

app.post("/submit-neurapath", submitNeuraPathRequisition);
app.post("/submit-vitasure", submitVitaSureRequisition);
app.post("/submit-quantiadx", submitQuantiaDxRequisition);

module.exports = app;
