const { Category } = require("../models/categoryModel");


exports.createCategory = async (req, res) => {
  const name = req.body;
  const result = await new Category(name).save();
  res.send(result);
};

exports.getCategories = async (req, res) => {
  const result = await Category.find({});
  res.send(result); 
};  

