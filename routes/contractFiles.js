const express = require("express");
const multer = require("multer");
const upload = multer({dest: "contracts/"});
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
    res.sendFile(path.resolve("static/contractUpload.html"));
}).post("/", upload.single("file"), (req, res) => {
  res.json({message: "File uploaded successfully"});
});

module.exports = router;
