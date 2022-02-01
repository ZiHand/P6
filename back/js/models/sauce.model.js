const mongoose = require('mongoose');

// ===================================================
//                      Schema
// ===================================================
const sauceSchema = mongoose.Schema(
{
    userId          : { type: String, required: true },
    name            : { type: String, required: true },
    manufacturer    : { type: String, required: true },
    description     : { type: String, required: true },
    mainPepper      : { type: String, required: true },
    imageUrl        : { type: String, required: true },
    heat            : { type: Number, required: true },
    likes           : { type: Number, required: true },
    dislikes        : { type: Number, required: true },
    usersLiked      : { type: Array,  required: true },
    usersDisliked   : { type: Array,  required: true }
});
  

// ===================================================
//                      Export
// ===================================================
// The third parameter to mongoose.model is an explicit collection name.
// If the collection des not exist, it will create it.
module.exports = mongoose.model('Sauce', sauceSchema, 'sauces');