const User      = require('../models/user.model');
const jwt       = require('jsonwebtoken');
const bcrypt    = require("bcrypt");

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
    //const mail = CryptoJS.AES.encrypt(req.body.email, process.env.SECRET_KEY).toString();
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
                
                    res.status(201).json({userId: user.email, token: jwt.sign({ userId: user.email }, process.env.SECRET_KEY, { expiresIn: '24h' })});
                })
              .catch(error => res.status(500).json({ error }));
        })
        .catch(error =>
        {
            res.status(500).json({ error });
        }); 
}