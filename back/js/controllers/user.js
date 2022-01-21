const User      = require('../models/user');
const bcrypt    = require("bcrypt");

const saltRounds = 10;

// ===================================================
// hashPassword
// ===================================================
function hashPassword(input)
{
    return bcrypt.hashSync(input, saltRounds);

    bcrypt
  .hash(input, saltRounds)
  .then(hash => {
    console.log(`Hash: ${hash}`);
    // Store hash in your password DB.
  })
  .catch(err => console.error(err.message));
}

// ===================================================
// unHashPassword
// ===================================================
function unHashPassword(input)
{
    return bcrypt.hashSync(input, 10);
}

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

    console.log(req.body.email);
    console.log(req.body.password);
    

    delete req.body._id;

    const user = new User({...req.body});
    user.password = bcrypt.hashSync(req.body.password, saltRounds);
    console.log(user);

    res.send('Signup page');
}