const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { isLoggedIn } = require("../middlewares/authMiddleware");

router.get("/dashboard", isLoggedIn, userController.getDashboard);

module.exports = router;
