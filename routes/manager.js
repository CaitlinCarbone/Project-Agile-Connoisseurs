const express = require("express");
const router = express.Router();

const customers = [
  { id: 123, name: "John Jones" },
  { id: 456, name: "Jill Jameson" },
  { id: 789, name: "Jack Johnson" },
];

router.get("/", (req, res) => {
  res.render("pages/manager/dashboard", {
    title: "Dashboard",
    layout: "manager",
  });
});

router.get("/projects", (req, res) => {
  res.render("pages/manager/projects", {
    title: "Manage Projects",
    layout: "manager",
    customers: customers,
  });
});

router.get("/customers", (req, res) => {
  res.render("pages/manager/customers", {
    title: "Manage Customers",
    layout: "manager",
    customers: customers,
  });
});

module.exports = router;
