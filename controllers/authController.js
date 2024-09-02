const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const { JWT_SECRET } = require("../config/config");

exports.register = async (req, res) => {
  const { email, password, username, mobileNumber, name } = req.body;
  let user = await userModel.findOne({ email });

  if (user) return res.status(500).send("User already registered");

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let newUser = await userModel.create({
        username,
        name,
        mobileNumber,
        email,
        password: hash,
      });
      let token = jwt.sign({ email: email, userid: newUser._id }, JWT_SECRET);
      res.cookie("token", token);
      res.redirect("/login");
    });
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) return res.status(500).send("Something went wrong");

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email: email, userid: user._id }, JWT_SECRET);
      res.cookie("token", token);
      res.redirect("/dashboard");
    } else {
      res.redirect("/login");
    }
  });
};

exports.logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  res.redirect("/login");
};

exports.getHome = async (req, res) => {
  res.render("index.ejs");
}