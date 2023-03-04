const express = require("express");
const router = express.Router();
const path = require('path')
// const data = require("../data");

router.get("*", (req, res) => {
    res.sendFile(path.resolve("views/login.html"));
});

module.exports = router;
