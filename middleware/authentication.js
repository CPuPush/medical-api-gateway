const jwt = require("jsonwebtoken");
const { JWT_SECRET, URL_USER_SERVICE } = process.env;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: err,
      });
    }
    req.user = decoded;
    return next();
  });
};
