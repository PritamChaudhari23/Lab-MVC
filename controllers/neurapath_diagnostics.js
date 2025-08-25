const submitNeuraPathRequisition = (req, res) => {
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

  console.log("NeuraPath Lab Order Submitted:", labOrder);

  res.send("NeuraPath Diagnostics form submitted successfully!");
};

module.exports = {
  submitNeuraPathRequisition,
};
