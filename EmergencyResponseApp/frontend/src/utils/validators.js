export const validateRegister = (name, phone, password) => {
  if (!name || !phone || !password) {
    return "All fields are required";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return "";
};

export const validateLogin = (phone, password) => {
  if (!phone || !password) {
    return "Phone and Password are required";
  }

  return "";
};