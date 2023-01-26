const { Schema, Types, model } = require('mongoose')


const roleSchema = new Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() }
});

const Role = model("Role", roleSchema);

exports.Role = Role;
