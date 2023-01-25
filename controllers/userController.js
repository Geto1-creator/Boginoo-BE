const { User } = require("../models/userModels");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt(1);
  const hash = await bcrypt.hash(password, salt);

  const user = await User.create({ email, password: hash });
  res.status(201).json(user);
};

exports.getUsers = async (req, res) => {
  const result = await User.find({});
  res.send(result);
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  const accessToken = jwt.sign(
    { email: user.email, password: user.password },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ accessToken: accessToken });
};

exports.getAuthToken = async (req, res) => {
  console.log("get auth token");
  res.send("User Exists");
};

exports.getUser = async (req, res) => {
  const id = req.params.id;
  const result = await User.findById({ _id: id }).populate("history");
  res.send(result);
};

exports.addLinkToUser = async (req, res) => {
  const userId = req.params.id;
  const linkId = req.body.id;

  const user = await User.findById(userId);
  console.log(user);
  user.history.push(linkId);
  await user.save();
  res.send(user)
};
