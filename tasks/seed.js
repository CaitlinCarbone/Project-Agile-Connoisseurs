const { userData, customerData, projectData } = require("../data");

const seed = async () => {
  try {
    await customerData.createCustomer(
      "jane@gmail.com",
      "password",
      "Jane",
      "Doe",
      "123 Easy Street",
      "Los Angeles",
      "CA"
    );
    await customerData.createCustomer(
      "kyle@gmail.com",
      "password",
      "Kyle Henderson",
      "Doe",
      "456 Wallaby Way",
      "Seattle",
      "WA"
    );
    await customerData.createCustomer(
      "walter@gmail.com",
      "password",
      "Walter",
      "White",
      "308 Negra Arroyo Lane",
      "Albuquerque",
      "NM"
    );

    await userData.createUser(
      "manager@gmail.com",
      "StrongManagerPass123",
      "StrongManagerPass123",
      "manager"
    );

    await userData.createUser(
      "sales@gmail.com",
      "weaksales",
      "weaksales",
      "sales"
    );

    await userData.createUser(
      "contractor@gmail.com",
      "ChadContractorAlphaNumeric-Cp3ViTJhUPrWSM",
      "ChadContractorAlphaNumeric-Cp3ViTJhUPrWSM",
      "contractor"
    );
  } catch (e) {
    console.log(e);
  }
};

seed().then(() => {
  console.log("Done seeding!");
  process.exit();
});
