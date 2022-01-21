const User      = require('../models/user');
const bcrypt    = require("bcrypt");
var CryptoJS    = require("crypto-js");
const secretKey = "Hypolite_Est_Un_Chien_Qui_Mange_Trop!";

const saltRounds = 10;
const emailMask2Options = {maskWith: "*", unmaskedStartCharactersBeforeAt: 3, unmaskedEndCharactersAfterAt: 2, maskAtTheRate: false};

// ===================================================
// createUser
// ===================================================
exports.createUser = (req, res, next) => 
{
    console.log("Creating user");

    if (!req.body.email || !req.body.password) 
    {
      return res.status(400).send(new Error('Bad request!'));
    }


    delete req.body._id;

    const user      = new User({...req.body});

    // Encrypt
    user.email      = CryptoJS.AES.encrypt(req.body.email, secretKey).toString();
    user.password   = bcrypt.hashSync(req.body.password, saltRounds);

    var bytes           = CryptoJS.AES.decrypt(user.email, secretKey);
    var originalText    = bytes.toString(CryptoJS.enc.Utf8);

    console.log(originalText);
    
    console.log(user);

    res.send('Signup page');
}