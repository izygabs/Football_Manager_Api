const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.verifyToken = (req, res, next) => {
  let token = req.cookies.appToken;
  const secrete = process.env.secreteToken;
  try {
    jwt.verify(token, secrete, (error, decoded) => {
      if (error) {
        // console.log(error);
        console.error("Jwt verification failed", error.message);
      } else {
        req.user = decoded.email;
      }
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.UNAUTHORIZED).send("Invalid token");
  }
};
