require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const white_lists = ["/", "/login", "/register"];

  if (white_lists.find((item) => "/v1/api" + item === req.originalUrl)) {
    next();
  } else {
    if (req?.headers?.authorization?.split(" ")?.[1]) {
      const token = req.headers.authorization.split(" ")[1];

      //Verify token
      try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        next();
      } catch {
        return res.status(401).json({
          message: "Token is expired or invalid",
        });
      }
    } else {
      return res.status(401).json({
        message:
          "You have not passed access token in header/The token has expired!",
      });
    }
  }
};

module.exports = auth;
