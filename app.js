const express = require("express");
var cors = require("cors");
var cookieParser = require("cookie-parser");
const app = express();
const configRoutes = require("./routes/index.js");

// Server-wide middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));

// Our implemented routes
configRoutes(app);

// Bootstrap the application
let port = process.env.PORT || 8888;
app.listen(port, () => {
  console.log(`Server accessible at http://localhost:${port}`);
});
