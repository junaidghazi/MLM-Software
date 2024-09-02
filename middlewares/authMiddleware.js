const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

exports.isLoggedIn = (req, res, next) => {
  if (!req.cookies.token) return res.redirect("/login");

  try {
    let data = jwt.verify(req.cookies.token, JWT_SECRET);
    req.user = data;
    next();
  } catch (err) {
    res.redirect("/login");
  }
};
