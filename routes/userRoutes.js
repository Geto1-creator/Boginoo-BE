const express = require("express"),
    cors = require("cors");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { createUser, getUsers, getUser, loginUser, getAuthToken, addLinkToUser } = require("../controllers/userController");
const { checkUser, authenticateToken } = require("../middleware/userMiddleware");


router
    .get('/users', getUsers)
    .post("/users", createUser)
    .post("/login", checkUser, loginUser)
    .post("/user", authenticateToken)
    .get("/user/:id", getUser)
    .put("/user/:id", addLinkToUser)
    .delete("/user/:id", () => { });

exports.userRoutes = router;
