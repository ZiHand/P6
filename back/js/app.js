const express           = require('express');
const mongoose          = require('mongoose');
const User              = require('./models/user');

const userRoutes        = require('./routes/user');
const sauceRoutes       = require('./routes/sauce');


const url               = 'mongodb+srv://ZiggyHand:zigman2014@cluster0.znqej.mongodb.net/Piiquante?retryWrites=true&w=majority';



// ===================================================
//                 Express App Creation
// ===================================================
const app = express();
// Ici, Express prend toutes les requêtes qui ont comme Content-Type  application/json  
// et met à disposition leur  body  directement sur l'objet req
app.use(express.json());

// ===================================================
//                     Middlewares
// ===================================================

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
//                     signUp
// ===================================================
/*app.post('/api/auth/signup', (req, res, next) => 
{
    console.log("signUp call");
    console.log(req.body);
    next();
});*/

app.post('/api/auth/signup', userRoutes);

// ===================================================

// ===================================================
//                  Database connection
// ===================================================
function databaseConnet()
{
    if (url !== '')
    {
        mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, keepAlive: true, keepAliveInitialDelay: 300000})
        .then(() => console.log('Connection to Piiquante Database OK'))
        .catch((err) => console.log('Connection to Piiquante Database FAILED ! ' + err)); 

        //Get the default connection
        var db = mongoose.connection;
        //Bind connection to error event (to get notification of connection errors)
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    } 
}

// ===================================================
//                  Main Run
// ===================================================
databaseConnet();

module.exports = app;