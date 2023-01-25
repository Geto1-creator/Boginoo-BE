const { Schema, Types, model } = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate: [isEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [6, 'Minimum password length is 6 character']
    },
    createdAt: { type: Date, default: Date.now() },
    history: [{ type: Schema.Types.ObjectId, ref: 'Link' }]
});

const User = model("User", userSchema);

exports.User = User;
