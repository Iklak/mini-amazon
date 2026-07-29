const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  console.log(req.headers.authorization);
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access denied",
    });
  }

  const token = authHeader.split(" ")[1];
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decode;
  next();
};

module.exports = protect;
