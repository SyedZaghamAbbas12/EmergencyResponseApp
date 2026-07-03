const bcrypt = require("bcryptjs");
const User = require("../models/User");

const registerUser = async ({ name, phone, password }) => {
  const userExists = await User.findOne({ phone });

  if (userExists) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    phone,
    password: hashedPassword,
  });

  return user;
};

const loginUser = async ({ phone, password }) => {
  const user = await User.findOne({ phone });

  if (!user) {
    throw new Error("Invalid phone or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid phone or password");
  }

  return user;
};

module.exports = {
  registerUser,
  loginUser,
};