const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const users = require('../../models/users/user.js');

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.get({ email });
    console.log(user);
    const match = await bcrypt.compare(password, user?.password);
    if (match) {
      const payload = {
        email,
      };
      const access = jsonwebtoken.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      const refresh = jsonwebtoken.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      await users.update(user?.id, { refresh_token: refresh });
      res.cookie("refresh", refresh, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ access,user_id:user.user_id });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    if (error.status === 404) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const handleLogout = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.refresh) return res.sendStatus(204);
    const refresh = cookies.refresh;
    const user = await users.get({ refresh_token: refresh });
    if (user) {
      await users.update(user?.id, { refresh_token: "null" });
    }
    res.clearCookie("refresh", { httpOnly: true });
    res.sendStatus(204);
  } catch (error) {
    if (error.status === 404) {
      res.clearCookie("refresh", { httpOnly: true });
      res.sendStatus(204);
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports= { handleLogin, handleLogout };