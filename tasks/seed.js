const { userData, customerData, projectData } = require("../data");

(async () => {
  customerData.createCustomer(
    "jane@gmail.com",
    "password",
    "Jane",
    "Doe",
    "123 Easy Street",
    "Los Angeles",
    "CA"
  );
  customerData.createCustomer(
    "kyle@gmail.com",
    "password",
    "Kyle Henderson",
    "Doe",
    "456 Wallaby Way",
    "Seattle",
    "WA"
  );
  customerData.createCustomer(
    "walter@gmail.com",
    "password",
    "Walter",
    "White",
    "308 Negra Arroyo Lane",
    "Albuquerque",
    "NM"
  );
})();
