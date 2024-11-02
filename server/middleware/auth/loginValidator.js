const loginValidator = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Validation Error: Missing required fields.",
      required_fields: ["email", "password"],
    });
  }
  next();
};

module.exports=loginValidator;