const express = require("express");
const router = express.Router();
const path = require("path");

router.get("*", (req, res) => {
  res.sendFile(path.resolve("static/managerhomepage.html"));
});

module.exports = router;
