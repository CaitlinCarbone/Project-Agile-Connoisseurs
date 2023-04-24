const express = require("express");
const app = express();
const session = require("express-session");

const configRoutes = require("./routes");
const { engine } = require("express-handlebars");

var cors = require("cors");
app.engine(".hbs", engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", "./static/views");

// Server-wide middleware
app.use(
  session({
    name: "AuthCookie",
    secret: "c6JtqNU5YTHheCfLxANbbRH9cLs45X6j",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("static"));

// Logging middleware
app.use((req, res, next) => {
  let logStatement = `[${new Date().toUTCString()}]: ${req.method.toUpperCase()} ${
    req.originalUrl
  } `;
  if (req.session.user) logStatement += "(Authenticated)";
  else logStatement += "(Unauthenticated)";
  console.log(logStatement);
  next();
});

// Our implemented routes
configRoutes(app);

// Bootstrap the application
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Website accessible at http://localhost:${port}`);
});
