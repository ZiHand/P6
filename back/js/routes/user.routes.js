const router     = require('express').Router();
const userCtrl   = require('../controllers/user.controller');

// Signup.
router.post('/signup', userCtrl.createUser); 
// Login
router.post('/login', userCtrl.logUser); 

module.exports = router;