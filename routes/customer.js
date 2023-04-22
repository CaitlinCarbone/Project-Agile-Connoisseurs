const express = require("express");
const router = express.Router();
const path = require("path");

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
module.exports = router;
