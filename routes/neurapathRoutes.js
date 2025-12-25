const express = require("express");
const router = express.Router();

const {
  getNeuraPathStatic,
  getNeuraPathForm,
  submitNeuraPathRequisition,
} = require("../controllers-mongoose/neurapath_diagnostics");

// Static route
router.get("/static", getNeuraPathStatic);

// Dynamic form route
router.get("/requisition", getNeuraPathForm);

// Submit route
router.post("/submitNeurapath", submitNeuraPathRequisition);

module.exports = router;
