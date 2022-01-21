const express    = require('express');
const router     = express.Router();
const userCtrl   = require('../controllers/user');

// Signup.
/*router.post('/api/auth/signup', function (req, res) 
{
    console.log("Signup page");

    if (!req.body.email || !req.body.password) 
    {
      return res.status(400).send(new Error('Bad request!'));
    }

    console.log(req.body.email);
    console.log(req.body.password);

    res.send('Signup page');
})*/

router.post('/api/auth/signup', userCtrl.createUser); 

module.exports = router;