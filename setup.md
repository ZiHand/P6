///////////////////////////////////////////////////
// Front start
///////////////////////////////////////////////////

cd .\front
npm install
npm run start

///////////////////////////////////////////////////
// Back start
///////////////////////////////////////////////////
Into your back/config please creat a ".env" file
then add the content and update it with your configuration:

PORT=your_port
DB_USER_PASS=db_user_passord
SECRET_KEY=your_secret_key

cd .\back
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
