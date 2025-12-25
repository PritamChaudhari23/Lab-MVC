const express = require("express");
const path = require("path");

const {
  getNeuraPathStatic,
  getNeuraPathForm,
  submitNeuraPathRequisition,
} = require("./controllers-mongoose/neurapath_diagnostics");
const {
  getVitaSureStatic,
  getVitaSureForm,
  submitVitaSureRequisition,
} = require("./controllers-mongoose/vitasure_labs");
const {
  getQuantiaDxStatic,
  getQuantiaDxForm,
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
app.get("/neurapath-static", getNeuraPathStatic);

app.get("/vitasure-static", getVitaSureStatic);

app.get("/quantiadx-static", getQuantiaDxStatic);

// ========== EJS-Based Routes (Dynamic) ==========

app.get("/neurapath", getNeuraPathForm);

app.get("/vitasure", getVitaSureForm);

app.get("/quantiadx", getQuantiaDxForm);

// ========== POST Routes ==========

app.post("/submit-neurapath", submitNeuraPathRequisition);
app.post("/submit-vitasure", submitVitaSureRequisition);
app.post("/submit-quantiadx", submitQuantiaDxRequisition);

module.exports = app;

// TO-DO: Try to use express Router for better route management
