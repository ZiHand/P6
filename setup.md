À partir de votre dossier backend , exécutez la commande de terminal npm init pour initialiser votre projet.
Créez un fichier server.js à l'intérieur de votre dossier backend . Il contiendra votre premier serveur Node.

///////////////////////////////////////////////////
// Front start
///////////////////////////////////////////////////
cd front
npm install
npm run start

///////////////////////////////////////////////////
// Back start
///////////////////////////////////////////////////
cd back
npm install
npm start

///////////////////////////////////////////////////
// Used package for Back (automatically installed) please detail
///////////////////////////////////////////////////
nodemon : Used to automatically refresh the back server when saving files.
express : Express only provides basic web (and mobile) app functionality.
mongoose : Used as interface between Node.js and MongoDB Serveur.
bcrypt : A password-hashing function library.
jsonwebtoken : JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.
multer : Multer is a node.js middleware for handling multipart/form-data , which is primarily used for uploading files.
dotenv : The dotenv is a zero-dependency module that loads environment variables from a . env file into process. env.
mongoose-unique-validator : plugin which adds pre-save validation for unique fields within a Mongoose schema. This makes error handling much easier.

///////////////////////////////////////////////////
// Good to know
///////////////////////////////////////////////////
ROUTES : A route is a section of Express code that associates an HTTP verb ( GET , POST , PUT , DELETE , etc.),
a URL path/pattern, and a function that is called to handle that pattern.

MidldleWare : A middleware is basically a function that will the receive the Request and Response objects, just like your route Handlers do.
As a third argument you have another function which you should call once your middleware code completed (next()).
They can be stacked.

Controllers: Functions that separate out the code to route requests from the code that actually processes requests.
Generally one controller per Model.

Models: A Mongoose model is a wrapper on the Mongoose schema. A Mongoose schema defines the structure of the document, default values, validators, etc.,
whereas a Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.

RGPD: Le règlement général sur la protection des données (RGPD) responsabilise les organismes publics et privés qui traitent leurs données.
Ne stocker que les données nécessaire, encryption et authentification pour l'acces.

OWASP: Organisme communautaire donnant des "top 10", des outils et des seminaires pour securiser les technologies liées au web.
