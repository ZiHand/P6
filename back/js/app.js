const express   = require('express');
const mongoose  = require('mongoose');

// ===================================================
//                  Database connection
// ===================================================
function databaseConnet(irl)
{
    if (irl !== '')
    {
        mongoose.connect(irl, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('Connexion to Piiquante Database OK'))
        .catch((err) => console.log('Connexion to Piiquante Database FAILED ! : ' + err)); 

        return;
    }

    throw("Piiquante Database Connexion : Wrong irl.");
    
}



// ===================================================
//                  Main Run
// ===================================================
function mainRun()
{
    let irl = 'mongodb+srv://ZiggyHand:zigman2014@cluster0.znqej.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

    try
    {
        databaseConnet(irl);
    }
    catch(err)
    {
        console.log(err);
    }
    
}

// ===================================================
const app = express();
// Avec ceci, Express prend toutes les requêtes qui ont comme Content-Type  application/json  et met à disposition leur  body  directement sur l'objet req
app.use(express.json());
mainRun();

module.exports = app;