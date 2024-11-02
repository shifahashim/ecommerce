const jsonwebtoken = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });
  const token = authHeader?.split(" ")[1];
  try {
    jsonwebtoken.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.status(403).json({ message: "Forbidden" });
        req.user = decoded.email;
        next();
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = verifyJWT;