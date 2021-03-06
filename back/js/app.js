const express = require("express");
const userRoutes = require("./routes/user.routes");
const sauceRoutes = require("./routes/sauce.routes");

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
app.use((req, res, next) => {
  // accéder à notre API depuis n'importe quelle origine ( '*' ) ;
  res.setHeader("Access-Control-Allow-Origin", "*");
  // ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  // envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// ===================================================
//                     Routes
// ===================================================
app.use("/images", express.static("images"));

app.use("/api/auth", userRoutes);
app.use("/api/auth", userRoutes);

app.use("/api/sauces", sauceRoutes);
app.use("/api/sauces", sauceRoutes);
app.use("/api/sauces", sauceRoutes);
app.use("/api/sauces", sauceRoutes);
app.use("/api/sauces", sauceRoutes);
app.use("/api/sauces", sauceRoutes);

// ===================================================
module.exports = app;
