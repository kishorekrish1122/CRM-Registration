const validateUserInput = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields",
    });
  }

  next();
};

module.exports = {
  validateUserInput,
};