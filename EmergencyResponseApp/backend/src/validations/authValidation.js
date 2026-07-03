    const validateRegister = (req, res, next) => {
  const { name, phone, password } = req.body;

  if (!name || !phone || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({
      success: false,
      message: "Phone and Password are required",
    });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
};