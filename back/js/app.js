const express   = require('express');
const mongoose  = require('mongoose');
let isStarted   = false;

// ===================================================
//                  Database connection
// ===================================================
function databaseConnet(irl)
{
    if (irl !== '')
    {
        mongoose.connect(irl, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('Connection to Piiquante Database OK'))
        .catch((err) => console.log('Connection to Piiquante Database FAILED ! ' + err)); 

        isStarted = true;
    } 
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
//                 Express App Creation
// ===================================================
const app = express();
// Avec ceci, Express prend toutes les requêtes qui ont comme Content-Type  application/json  et met à disposition leur  body  directement sur l'objet req
app.use(express.json());

// ===================================================
//                     Middlewares
// ===================================================
// le middleware ne prend pas d'adresse en premier paramètre, 
// afin de s'appliquer à toutes les routes. 
// Cela permettra à toutes les demandes de toutes les origines d'accéder à l' API.
// ===================================================
app.use((req, res, next) => 
{
    // accéder à notre API depuis n'importe quelle origine ( '*' ) ;
    res.setHeader('Access-Control-Allow-Origin', '*');
    // ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// ===================================================
mainRun();

module.exports = app;