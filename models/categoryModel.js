const { Schema, Types, model } = require("mongoose");


const categoryModel = new Schema({
    name: {type: String, required: true},
    createdAt: { type: Date, default: Date.now()},
});

const Category = model("Category", categoryModel);

exports.Category = Category;
