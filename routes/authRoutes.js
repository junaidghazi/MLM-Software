const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/", authController.getHome);
router.post("/register", authController.register);
router.get("/login", (req, res) => res.render("loginpage"));
router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;
