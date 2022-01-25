const mongoose          = require('mongoose');
const uniqueValidator   = require('mongoose-unique-validator');

// ===================================================
//                      Schema
// ===================================================
const userSchema = mongoose.Schema(
{
    email       : { type: String, required: true, unique: true }, // Should Not Be crypted ? crypto.js ou maskdata
    password    : { type: String, required: true }, // Must Be Hashed
});
  
// Apply the uniqueValidator plugin to userSchema.
// WHY IF COMMENTED IT STILL WORK ?!!?
userSchema.plugin(uniqueValidator);

// ===================================================
//                      Export
// ===================================================
module.exports = mongoose.model('User', userSchema, 'users');