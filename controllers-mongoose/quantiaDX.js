// ========== QuantiaDx Controller with Mongoose ==========

const Requisition = require("../models/Requisition");

const submitQuantiaDxRequisition = async (req, res) => {
  const labOrder = {
    patient: {
      firstName: req.body["firstname"],
      middleName: req.body["middlename"],
      lastName: req.body["lastname"],
      gender: req.body["gender"],
      dob: req.body["dob"],
      email: req.body["email"],
      phone: req.body["phone"],
    },
    insurance: {
      provider: req.body["insurance-provider"],
      id: req.body["insurance-id"],
    },
    provider: {
      name: req.body["provider-name"],
      npi: req.body["npi-number"],
      address: req.body["provider-address"],
    },
    tests: req.body["tests"] || [],
  };

  try {
    // Save to database
    const newRequisition = new Requisition({
      lab: "quantiadx",
      patientData: labOrder,
    });
    await newRequisition.save();

    console.log("QuantiaDx Lab Order Submitted and Saved:", labOrder);
    res.send("QuantiaDx form submitted and saved successfully!");
  } catch (error) {
    console.error("Error saving requisition:", error);
    res.status(500).send("Error submitting form. Please try again.");
  }
};

module.exports = {
  submitQuantiaDxRequisition,
};