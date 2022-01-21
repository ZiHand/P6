const mongoose = require('mongoose');

// ===================================================
//                      Schema
// ===================================================
const userSchema = mongoose.Schema(
{
    email       : { type: String, required: true, unique: true }, // Should Not Be crypted ? crypto.js ou maskdata
    password    : { type: String, required: true }, // Must Be Hashed
});
  

// ===================================================
//                      Export
// ===================================================
module.exports = mongoose.model('User', userSchema, 'users');