const express = require("express");
const router = express.Router();
const { userData, validation } = require("../data");

router.get("/", (req, res) => {
  if (req.session.user) {
    switch (req.session.user.role) {
      case "sales":
        res.redirect("/sales");
        break;
      case "manager":
        res.redirect("/manager");
        break;
      case "contractor":
        res.redirect("/contractor");
        break;
      case "customer":
        res.redirect("/customer");
      default:
        console.log("User with invalid role detected, logging out.");
        res.redirect("/logout");
    }
  } else {
    return res.render("pages/home", {
      title: "Home",
      header: "default-header",
    });
  }
});

router.get("/contact", async (req, res) => {
  return res.render("pages/contact", {
    title: "Contact Us",
    header: "default-header",
    css: "/css/contact.css",
  });
});

router.get("/availability", (req, res) => {
  return res.render("pages/availability", {
    title: "Availability",
    header: "default-header",
  });
});

router.get("/promotions", (req, res) => {
  return res.render("pages/promotions", {
    title: "Promotions And Discounts",
    header: "default-header",
  });
});

router.get("/login", async (req, res) => {
  if (req.session.user) res.redirect("/");
  res.render("pages/login", {
    title: "Login",
    header: "no-header",
    css: "/css/login.css",
    error: null,
  });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) return res.sendStatus(400);
      else res.redirect("/");
    });
  } else res.end();
});

router.get("/register", async (req, res) => {
  res.render("pages/register", {
    title: "Register",
    header: "no-header",
    css: "/css/signup.css",
    error: null,
  });
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  let { email, password, confirmPassword, userType } = req.body;
  try {
    validation.checkEmail(email);
    validation.checkPassword(password);
    validation.checkPassword(confirmPassword);
  } catch (e) {
    console.log(e);
    return res.render("pages/register", {
      title: "Register",
      header: "no-header",
      css: "/css/signup.css",
      error: null,
    });
  }
  try {
    const result = await userData.createUser(
      email,
      password,
      confirmPassword,
      userType
    );
    if (result.success) res.redirect("/");
    else
      return res.render("pages/register", {
        title: "Register",
        header: "no-header",
        css: "/css/signup.css",
        error: "Internal Server Error!",
      });
  } catch (e) {
    console.log(e);
    return res.render("pages/register", {
      title: "Register",
      header: "no-header",
      css: "/css/signup.css",
      error: e,
    });
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  let { email, password } = req.body;
  try {
    validation.checkEmail(email);
    validation.checkPassword(password);
  } catch (e) {
    console.log(e);
    return res.render("pages/login", {
      title: "Login",
      header: "no-header",
      css: "/css/login.css",
      error: null,
    });
  }
  try {
    const result = await userData.checkUser(email, password);
    if (result.authenticated) {
      req.session.user = {
        email: email,
        role: result.role,
      };
      res.redirect("/");
    } else
      return res.render("pages/login", {
        title: "Login",
        header: "no-header",
        css: "/css/login.css",
        error: "Internal Server Error!",
      });
  } catch (e) {
    console.log(e);
    return res.render("pages/login", {
      title: "Error",
      header: "no-header",
      css: "/css/login.css",
      error: e,
    });
  }
});

module.exports = router;
