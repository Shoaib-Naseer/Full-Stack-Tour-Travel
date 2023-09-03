export const validateEmail = (email) => {
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailPattern.test(email)) {
    return "Invalid email address";
  }

  return "";
};

export const validatePassword = (password) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }

  return "";
};
