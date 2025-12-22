const axios = require("axios");

async function fetchAndFormatUserData() {
  try {
    const response = await axios.get("https://dummyjson.com/users/3");
    const data = response.data;

    // Map API data to your requisition form structure
    const reqObj = {
      patient: {
        firstname: data.firstName || "John",
        middlename: "", // No middle name in API, dummy empty
        lastname: data.lastName || "Doe",
        gender: data.gender || "prefer-not-say",
        dob: data.birthDate || "1990-01-01", // dummy if missing
        email: data.email || "john.doe@example.com",
        phone: data.phone || "555-123-4567",
      },
      insurance: {
        provider: "", // No insurance info in API, dummy empty
        id: "",
      },
      provider: {
        name: "", // No provider info in API, dummy empty
        npi: "",
        address: "",
      },
    };

    console.log(reqObj);
    return reqObj;
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    return null;
  }
}

module.exports = {
  fetchAndFormatUserData,
};
