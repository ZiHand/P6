const express    = require('express');
const router     = express.Router();
const userCtrl   = require('../controllers/user');

// Signup.
router.post('/api/auth/signup', userCtrl.createUser); 

module.exports = router;