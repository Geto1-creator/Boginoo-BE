const { Link } = require("../models/linkModels");

exports.isValidUrl =  async(req, res, next) => {
    const url = req.body;
    console.log(url.full.slice(0, 7));
    if(url.full.slice(0, 8) === "https://") {
        next()
    } else {
        res.status(401).json({ message: "Invalid URL" });
    }
}