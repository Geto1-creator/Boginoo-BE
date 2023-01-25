const jwt = require("jsonwebtoken");
const { User } = require("../models/userModels");
const bcrypt = require("bcrypt");

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  if (err.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }

  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

exports.isValidUser = async (req, res, next) => {
  const { email, password } = req.body;
  const isAlready = await User.findOne({ email: email });
  console.log(isAlready);

  try {
    if (isAlready !== null) {
      res.status(400).send("That email is already registered");
      return;
    }
    next();
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).send({ errors });
  }
};

exports.checkUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });


  if (user) {
    if (user.email !== null && user.password !== null) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        next();
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    } else {
      res.status(401).json({ message: "Unreadable password or email" });
    }
  } else {
    res.status(401).json({ message: "User not found" });
  }
};

exports.authenticateToken = (req, res, next) => {

  const authHeader = req.body.headers.Authorization


  console.log(authHeader, "authenticateToken");
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, result) => {
    if (err) {
      res.send(err);
    } else {
      const email = result.email;
      const user = await User.findOne({ email: email });
      res.send(user);
    }
  });
};
