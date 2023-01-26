const express = require("express"),
  cors = require("cors");
const { roleMiddleware } = require("../middleware/roleMiddleware");
const { createCategory, getCategories } = require("../controllers/categoryController")
const router = express.Router();

router
  .post("/category", roleMiddleware, createCategory)
  .get("/category", getCategories )

exports.categoryRoutes = router;
