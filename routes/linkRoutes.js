const express = require("express"),
  cors = require("cors");
const { createLink, getLinks, getShortLink } = require("../controllers/linkController");
const { isValidUrl } = require("../middleware/urlMiddleware");
const router = express.Router();

router
  .post("/links", isValidUrl, createLink)
  .get("/links", getLinks)
  .get("/:shortUrl", getShortLink)

exports.linkRoutes = router;
