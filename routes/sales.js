const express = require("express");
const router = express.Router();
const path = require("path");
const { customerData } = require("../data");

router.get("/", async (req, res) => {
  res.sendFile(path.resolve("static/salespersonhomepage.html"));
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

module.exports = router;
