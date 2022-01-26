const mongoose          = require('mongoose');
const uniqueValidator   = require('mongoose-unique-validator');
const bcrypt            = require("bcrypt");

// ===================================================
//                      Schema
// ===================================================
const userSchema = mongoose.Schema(
{
    email       : { type: String, required: true, unique: true, trim: true }, // Should Not Be crypted ? crypto.js ou maskdata
    password    : { type: String, required: true }, // Must Be Hashed
});
  
// Apply the uniqueValidator plugin to userSchema.
// WHY IF COMMENTED IT STILL WORK ?!!?
userSchema.plugin(uniqueValidator);

// Encrypt password before save
userSchema.pre("save", async function(next)
{
    const salt      = await bcrypt.genSalt();
    this.password   = await bcrypt.hash(this.password, salt);
    next();
})

// ===================================================
//                      Export
// ===================================================
module.exports = mongoose.model('User', userSchema, 'users');