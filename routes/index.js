const contractorRoutes = require("./contractor");
const customerRoutes = require("./customer");
const managerRoutes = require("./manager");
const profileRoutes = require("./profile");
const salesRoutes = require("./sales");
const path = require("path");

const constructorMethod = (app) => {
  app.use("/contractor", contractorRoutes);
  app.use("/customer", customerRoutes);
  app.use("/manager", managerRoutes);
  app.use("/profile", profileRoutes);
  app.use("/sales", salesRoutes);
  app.get("/home", (req, res) => {
    res.sendFile(path.resolve("static/home.html"));
  });
  app.get("/chooseuser", (req, res) => {
    res.sendFile(path.resolve("static/chooseuserpage.html"));
  });
  app.use("/login", (req, res) => {
    res.sendFile(path.resolve("static/login.html"));
  });
  app.use("/register", (req, res) => {
    res.sendFile(path.resolve("static/register.html"));
  });
  app.use("*", (req, res) => {
    res.redirect("/home");
  });
};

module.exports = constructorMethod;
