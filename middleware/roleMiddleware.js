const { User } = require("../models/userModels");
const jwt = require("jsonwebtoken")

exports.roleMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token == null) return res.sendStatus(401);
  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!payload.role.includes("Admin")) {
      return res.sendStatus(403).json({"message" : "Permission denied"});
    }
    next();
  } catch (err) {
    res.send(err);
    console.log(err)
  }
};
