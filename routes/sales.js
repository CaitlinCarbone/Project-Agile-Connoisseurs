const express = require("express");
const router = express.Router();
const path = require("path");
const { customerData } = require("../data");

router.get("/", async (req, res) => {
  res.sendFile(path.resolve("static/salespersonhomepage.html"));
});
router.get("/viewProgress", (req, res) => {
  res.sendFile(path.resolve("static/sales-activeProjectsViewProgress.html"));
});

router.get("/customers", async (req, res) => {
  const allCustomers = await customerData.getAllCustomers();
  return res.render("pages/sales/customers", {
    title: "Customers",
    css: "/css/manager.css",
    layout: "sales",
    customers: allCustomers,
  });
});

router.post("/customers", async (req, res) => {
  let { email, password, firstName, lastName, address, city, state } = req.body;
  try {
    const result = await customerData.createCustomer(
      email,
      password,
      firstName,
      lastName,
      address,
      city,
      state
    );
    if (result.success) {
      const allCustomers = await customerData.getAllCustomers();
      return res.render("pages/sales/customers", {
        title: "Manage Customers",
        layout: "manager",
        css: "/css/manager.css",
        error: null,
        customers: allCustomers,
      });
    } else throw `Failed to create user`;
  } catch (e) {
    const allCustomers = await customerData.getAllCustomers();
    res.render("pages/sales/customers", {
      title: "Manage Customers",
      layout: "manager",
      error: e,
      css: "/css/manager.css",
      customers: allCustomers,
    });
  }
});

module.exports = router;
