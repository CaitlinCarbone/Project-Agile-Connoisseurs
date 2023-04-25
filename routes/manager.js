const express = require("express");
const router = express.Router();
const { customerData, projectData } = require("../data");

router.get("/", async (req, res) => {
  res.render("pages/manager/dashboard", {
    title: "Dashboard",
    layout: "manager",
  });
});

router.get("/projects", async (req, res) => {
  const allCustomers = await customerData.getAllCustomers();
  const allProjects = await projectData.getAllProjects();
  res.render("pages/manager/projects", {
    title: "Manage Projects",
    layout: "manager",
    customers: allCustomers,
    projects: allProjects,
  });
});

router.get("/customers", async (req, res) => {
  const allCustomers = await customerData.getAllCustomers();
  res.render("pages/manager/customers", {
    title: "Manage Customers",
    layout: "manager",
    css: "/css/manager.css",
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
      return res.render("pages/manager/customers", {
        title: "Manage Customers",
        layout: "manager",
        css: "/css/manager.css",
        error: null,
        customers: allCustomers,
      });
    } else throw `Failed to create user`;
  } catch (e) {
    const allCustomers = await customerData.getAllCustomers();
    res.render("pages/manager/customers", {
      title: "Manage Customers",
      layout: "manager",
      error: e,
      css: "/css/manager.css",
      customers: allCustomers,
    });
  }
});

module.exports = router;
