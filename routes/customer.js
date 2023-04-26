const express = require("express");
const router = express.Router();
const path = require("path");
const { customerData } = require("../data");

router.get("/", (req, res) => {
  res.sendFile(path.resolve("static/customer-home.html"));
});

router.get("/billing", (req, res) => {
  res.sendFile(path.resolve("static/customer-billing.html"));
});
router.get("/payment", (req, res) => {
  res.sendFile(path.resolve("static/customerPayment.html"));
});
router.get("/savings", (req, res) => {
  res.sendFile(path.resolve("static/customer-savings.html"));
});
router.get("/installation", (req, res) => {
  res.sendFile(path.resolve("static/customer-installation.html"));
});
router.get("/contact", (req, res) => {
  res.sendFile(path.resolve("static/customer-contactCustomerService.html"));
});

module.exports = router;
