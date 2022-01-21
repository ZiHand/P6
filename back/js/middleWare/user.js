const http      = require('http');
const mongoose  = require('mongoose');
const app       = require('../../js/app');


// ===================================================
//                     signUp
// ===================================================
app.post('/api/auth/signup', (req, res, next) => 
{
    // - Check if Mail is already in DB
    // - Hash Mail
    // - Hash password
    // - Add to DB
    console.log("signUp call");
    console.log(req.body);
    next();
});