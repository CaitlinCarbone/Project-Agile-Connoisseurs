const contractorRoutes = require("./contractor");
const customerRoutes = require("./customer");
const loginRoutes = require("./login");
const managerRoutes = require("./manager");
const profileRoutes = require("./profile");
const salesRoutes = require("./sales");
const path = require("path");


const constructorMethod = (app) => {
  app.use("/contractor", contractorRoutes);
  app.use("/customer", customerRoutes);
  app.use("/login", loginRoutes);
  app.use("/manager", managerRoutes);
  app.use("/profile", profileRoutes);
  app.use("/sales", salesRoutes);
  app.get("/home", (req, res) => {
    res.sendFile(path.resolve("views/home.html"));
  });
  app.get("/chooseuser", (req, res) => {
    res.sendFile(path.resolve("views/chooseuserpage.html"));
  });

  app.use("*", (req, res) => {
    res.redirect("/home");
  });
};

module.exports = constructorMethod;