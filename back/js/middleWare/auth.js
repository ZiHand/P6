require("dotenv").config({ path: "./config/.env" });
const jwt = require("jsonwebtoken");

// ===================================================
//
// ===================================================
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;

    if (req.body.userId && req.body.userId !== userId) {
      res.status(401).json({ message: "Unauthorized user" });
    } else {
      next();
    }
  } catch {
    res.status(401).json({ error: new Error("Invalid request!") });
  }
};
