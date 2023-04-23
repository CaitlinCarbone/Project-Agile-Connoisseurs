const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.resolve("static/contractorhomepage.html"));
});

router.get("/listOfcustomers", (req, res) => {
  res.sendFile(path.resolve("static/contractor-listOfCustomers.html"));
});
router.get("/scheduleInspection", (req, res) => {
  res.sendFile(path.resolve("static/contractor-scheduleInspection.html"));
});
router.get("/contracts", (req, res) => {
  res.sendFile(path.resolve("static/contractor-contracts.html"));
});
router.get("/installation", (req, res) => {
  res.sendFile(path.resolve("static/contractor-installation.html"));
});

module.exports = router;
