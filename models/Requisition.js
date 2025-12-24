const mongoose = require("mongoose");

const requisitionSchema = new mongoose.Schema({
  lab: {
    type: String,
    required: true,
    enum: ["neurapath", "vitasure", "quantiadx"],
  },
  patientData: {
    type: Object,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Requisition", requisitionSchema);
