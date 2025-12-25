const express = require("express");
const router = express.Router();

const {
  getVitaSureStatic,
  getVitaSureForm,
  submitVitaSureRequisition,
} = require("../controllers/vitasure_labs");

// Static route
router.get("/static", getVitaSureStatic);

// Dynamic form route
router.get("/requisition", getVitaSureForm);

// Submit route
router.post("/submitVitaSure", submitVitaSureRequisition);

module.exports = router;
