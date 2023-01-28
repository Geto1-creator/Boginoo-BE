const { User } = require("../models/userModels");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  const { email, password, role } = req.body;

  const salt = await bcrypt.genSalt(1);
  const hash = await bcrypt.hash(password, salt);

  const user = await User.create({ email, password: hash, roles: role });
  res.status(201).json(user);
};

exports.getUsers = async (req, res) => {
  const result = await User.find({});
  res.send(result);
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  try {
    const accessToken = jwt.sign(
      { email: user.email, password: user.password, role: user.roles },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ accessToken: accessToken });
  } catch (err) {
    res.send(err);
  }
};

exports.getAuthToken = async (req, res) => {
  console.log("get auth token");
  res.send("User Exists");
};

exports.getUser = async (req, res) => {
  const id = req.params.id;
  const skip = req.query.skip;
  const offSet = req.query.offSet || 5;
  const result = await User.findById({ _id: id }).populate({
    path: "history",
    limit: 5,
    skip: skip * offSet,
  });
  res.send(result);
};

exports.addLinkToUser = async (req, res) => {
  const userId = req.params.id;
  const linkId = req.body.id;

  const user = await User.findById(userId);
  console.log(user);
  user.history.push(linkId);
  await user.save();
  res.send(user);
};

exports.countDatas = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id });
    const history = user.history.length;
    console.log(history, "history");
    res.send({ count: Math.ceil((history + 1) / 5) });
  } catch (error) {
    res.status(404).json(error);
  }
};
