const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/errorHandler");
require("dotenv").config();

const verify = (req, res, next) => {
  try {
    const jwToken = req.headers.authorization;
    const { adminId } = jwt.verify(jwToken, process.env.JWT_SECRET_KEY);
    req.adminId = adminId;
    next();
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports = verify;
