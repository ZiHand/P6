const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USER_PASS +
      "@cluster0.znqej.mongodb.net/Piiquante?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepAlive: true,
      keepAliveInitialDelay: 300000,
    }
  )
  .then(() => console.log("Connection to Piiquante Database OK"))
  .catch((err) =>
    console.log("Connection to Piiquante Database FAILED !", err)
  );

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
