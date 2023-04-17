const contractorRoutes = require("./contractor");
const customerRoutes = require("./customer");
const managerRoutes = require("./manager");
const contractFilesRoutes = require("./contractFiles");
const profileRoutes = require("./profile");
const salesRoutes = require("./sales");
const path = require("path");

const constructorMethod = (app) => {
  app.use("/contractor", contractorRoutes);
  app.use("/customer", customerRoutes);
  app.use("/manager", managerRoutes);
  app.use("/sales", salesRoutes);
  app.use("/contractUpload", contractFilesRoutes);
  app.get("/", (req, res) => res.redirect("/home"));
  app.get("/home", (req, res) => {
    res.render("home", {
      title: "Home",
      cssFilePath: "/css/customer-portal.css",
    });
  });
  app.get("/availability", (req, res) => {
    res.sendFile(path.resolve("static/availability.html"));
  });
  app.get("/newProject", (req, res) => {
    res.sendFile(path.resolve("static/newproject.html"));
  });
  app.get("/salesinvoice", (req, res) => {
    res.sendFile(path.resolve("static/salesinvoice.html"));
  });
  app.get("/error", (req, res) => {
    res.sendFile(path.resolve("static/errorPage.html"));
  });
  app.get("/profile", (req, res) => {
    res.sendFile(path.resolve("static/profile.html"));
  });
  app.get("/salesProfile", (req, res) => {
    res.sendFile(path.resolve("static/sales-profile.html"));
  });
  app.get("/chooseuserpage", (req, res) => {
    res.sendFile(path.resolve("static/chooseuserpage.html"));
  });
  app.use("/login", (req, res) => {
    res.sendFile(path.resolve("static/login.html"));
  });
  app.use("/contact", (req, res) => {
    res.sendFile(path.resolve("static/contactCustomerService.html"));
  });
  app.use("/contactHome", (req, res) => {
    res.sendFile(path.resolve("static/contactHome.html"));
  });
  app.use("/logout", (req, res) => {
    res.sendFile(path.resolve("static/home.html"));
  });
  app.use("/register", (req, res) => {
    res.sendFile(path.resolve("static/register.html"));
  });
  app.use("*", (req, res) => {
    res.redirect("/error");
  });
};

module.exports = constructorMethod;
