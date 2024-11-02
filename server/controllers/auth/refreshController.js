//import jsonwebtoken from "jsonwebtoken";
const users = require('../../models/users/user.js');

const handleRefreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.refresh)
      return res.status(401).json({ message: "Unauthorized" });
    const refresh = cookies.refresh;
    const user = await users.get({ refresh_token: refresh });
    jsonwebtoken.verify(
      refresh,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || user?.email != decoded?.email) {
          return res.status(403).json({ message: "Forbidden" });
        }
        const payload = {
          email: decoded.email,
        };
        const access = jsonwebtoken.sign(
          payload,
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );
        res.json({ access });
      }
    );
  } catch (error) {
    if (error.status === 404) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = handleRefreshToken;