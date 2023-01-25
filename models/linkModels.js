const { Schema, Types, model } = require('mongoose')
const shortId = require('shortid')

const linkSchema = new Schema({
    full: { type: String, required: true },
    short: { type: String, required: true, default: shortId.generate }
});

const Link = model("Link", linkSchema);

exports.Link = Link;
