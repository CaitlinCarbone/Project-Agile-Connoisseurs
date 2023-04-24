const rootRoutes = require("./root");
const contractorRoutes = require("./contractor");
const customerRoutes = require("./customer");
const managerRoutes = require("./manager");
const contractFilesRoutes = require("./contractFiles");
const salesRoutes = require("./sales");
const path = require("path");

const constructorMethod = (app) => {
  app.use("/", rootRoutes);
  app.get("/error", (req, res) => {
    res.render("pages/error", {
      title: "Error",
      header: "no-header",
      error: "404 Page Not Found",
    });
  });
  app.use("/contractor", contractorRoutes);
  app.use("/customer", customerRoutes);
  app.use("/manager", managerRoutes);
  app.use("/sales", salesRoutes);
  app.use("/contractUpload", contractFilesRoutes);

  app.get("/newProject", (req, res) => {
    res.sendFile(path.resolve("static/newproject.html"));
  });
  app.get("/salesinvoice", (req, res) => {
    res.sendFile(path.resolve("static/salesinvoice.html"));
  });
  app.get("/profile", (req, res) => {
    res.sendFile(path.resolve("static/profile.html"));
  });
  app.get("/promotionsAndDiscounts", (req, res) => {
    res.sendFile(path.resolve("static/promotionsAndDiscounts.html"));
  });
  app.get("/salesProfile", (req, res) => {
    res.sendFile(path.resolve("static/sales-profile.html"));
  });
  app.get("/customerProfile", (req, res) => {
    res.sendFile(path.resolve("static/customer-profile.html"));
  });
  app.get("/managerProfile", (req, res) => {
    res.sendFile(path.resolve("static/manager-profile.html"));
  });
  app.get("/contractorProfile", (req, res) => {
    res.sendFile(path.resolve("static/contractor-profile.html"));
  });
  app.use("*", (req, res) => {
    res.status(404).redirect("/error");
  });
};

module.exports = constructorMethod;
