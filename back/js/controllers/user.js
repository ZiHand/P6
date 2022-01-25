const User          = require('../models/user');
var jwt             = require('jsonwebtoken');
const bcrypt        = require("bcrypt");
var CryptoJS        = require("crypto-js");
const secretKey     = "Hypolite_Est_Un_Chien_Qui_Mange_Trop!";
const saltRounds    = 13;

// ===================================================
// retreiveUserEmail // NOT USED FOR NOW
// ===================================================
function retreiveUserEmail(email)
{
    var bytes = CryptoJS.AES.decrypt(email, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// ===================================================
// retreiveUserEmail
// ===================================================
function isUserExist(user)
{
    return false;
}

// ===================================================
// createUser
// ===================================================
exports.createUser = (req, res, next) => 
{
    if (!req.body.email || !req.body.password) 
    {
        return res.status(400).json({ message: 'Creating user error !'});
    }

    const user = new User({...req.body});

    // Encrypt
    //user.email      = bcrypt.hashSync(req.body.password, saltRounds);
    user.password   = bcrypt.hashSync(req.body.password, saltRounds);

    // Check DB if user already exist
    if (isUserExist(user)) // Not used for now as Unique is used.
    {
        return res.status(409).json({ message: 'User already registered ! Please Login.'});
    }

    // Register to DB
    user.save()
        .then(() =>
        {
            res.status(201).json({ message: 'User registered !'});
        })
        .catch(error =>
        {
            res.status(409).json({ message: 'User already registered ! Please Login.'});
        });
}

// ===================================================
// logUser
// ===================================================
exports.logUser = (req, res, next) => 
{
    if (!req.body.email || !req.body.password) 
    {
        return res.status(400).json({ error: 'Login error !'});
    }

    // Not working for now
    //const mail = CryptoJS.AES.encrypt(req.body.email, secretKey).toString();
    //console.log(retreiveUserEmail(mail));

    User.findOne({ email: req.body.email })
        .then(function(user) 
        {
            if (!user)
            {
                return res.status(401).json({ error: 'User not found !' });
            }

            bcrypt.compare(req.body.password, user.password)
                .then(valid => 
                {
                    if (!valid) 
                    {
                        return res.status(401).json({ error: 'Incorrect pasword !' });
                    }
                
                    res.status(201).json({userId: user.email, token: jwt.sign({ userId: user.email }, secretKey, { expiresIn: '24h' })});
                })
              .catch(error => res.status(500).json({ error }));
        })
        .catch(error =>
        {
            res.status(500).json({ error });
        }); 
}