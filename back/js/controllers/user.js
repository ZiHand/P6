const User          = require('../models/user');
var jwt             = require('jsonwebtoken');
const bcrypt        = require("bcrypt");
var CryptoJS        = require("crypto-js");
const secretKey     = "Hypolite_Est_Un_Chien_Qui_Mange_Trop!";
const saltRounds    = 13;

// ===================================================
// retreiveUserEmail
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
    console.log("Creating user");

    if (!req.body.email || !req.body.password) 
    {
        console.log("createUser error");
        return res.status(400).json({ message: 'CreateUser error !'});
    }

    //delete req.body._id;
    const user = new User({...req.body});

    // Encrypt
    //user.email      = CryptoJS.AES.encrypt(req.body.email, secretKey).toString();
    user.password   = bcrypt.hashSync(req.body.password, saltRounds);

    console.log("Mail : " + req.body.email);
    console.log("Encrypted Mail : " + user.email);
    console.log("Mail : " + retreiveUserEmail(user.email));
    console.log("Encrypted Mail : " + CryptoJS.AES.encrypt(req.body.email, secretKey).toString());

    // Check DB if user already exist
    if (isUserExist(user))
    {
        console.log("User already registered !");
        return res.status(400).json({ message: 'User already registered ! Please Login.'});
    }

    // Register to DB
    user.save()
        .then(() =>
        {
            res.status(201).json({ message: 'User registered !'});
        })
        .then(() =>
        {
            console.log(retreiveUserEmail(user));
        })
        .catch(error =>
        {
            console.log("Save error : " + error);
            res.status(400).json({ error })
        });   

    

    //var token = jwt.sign({ foo: 'bar' }, secretKey);
    //res.send(token);

    

}

// ===================================================
// logUser
// ===================================================
exports.logUser = (req, res, next) => 
{
    console.log("Logging user");

    //console.log(req);

    if (!req.body.email || !req.body.password) 
    {
        console.log("Login error");
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
                console.log("User not found !");
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }

            console.log("User mail exist");
            console.log(user);
            
            bcrypt.compare(req.body.password, user.password)
                .then(valid => 
                {
                    if (!valid) 
                    {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                
                    console.log("User is valid");
                    res.status(200).json({userId: user._id, token: jwt.sign({ userId: user._id }, secretKey, { expiresIn: '24h' })});
                })
              .catch(error => res.status(500).json({ error }));
        })
        .catch(error =>
        {
            console.log("Logging error : " + error);
            res.status(500).json({ error });
        }); 
}