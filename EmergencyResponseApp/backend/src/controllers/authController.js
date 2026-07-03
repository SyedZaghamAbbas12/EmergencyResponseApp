const generateToken = require("../utils/generateToken");
const authService = require("../services/authService");

const register = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: generateToken(user._id),
      data: {
        id: user._id,
        name: user.name,
        phone: user.phone,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await authService.loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: generateToken(user._id),
      data: {
        id: user._id,
        name: user.name,
        phone: user.phone,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};