const submitNeuraPathRequisition = (req, res) => {
  const firstName = req.body["firstname"];
  const middleName = req.body["middlename"];
  const lastName = req.body["lastname"];
  const gender = req.body["gender"];
  const dob = req.body["dob"];
  const email = req.body["email"];
  const phone = req.body["phone"];

  const insuranceProvider = req.body["insurance-provider"];
  const insuranceId = req.body["insurance-id"];

  const providerName = req.body["provider-name"];
  const npiNumber = req.body["npi-number"];
  const providerAddress = req.body["provider-address"];

  // tests is an array of selected tests, or undefined if none selected
  const selectedTests = req.body["tests"];

  console.log("NeuraPath Diagnostics Form Submitted!");
  console.log("Patient:", firstName, middleName, lastName);
  console.log("Gender:", gender, "DOB:", dob);
  console.log("Email:", email, "Phone:", phone);
  console.log("Insurance:", insuranceProvider, insuranceId);
  console.log("Provider:", providerName, npiNumber, providerAddress);
  console.log("Selected Tests:", selectedTests);

  res.send("NeuraPath Diagnostics form submitted successfully!");
};

module.exports = {
  submitNeuraPathRequisition,
};
