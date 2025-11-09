export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const getErrorMessage = (field, value) => {
  if (!validateRequired(value)) {
    return `${field} is required`;
  }
  if (field === "Email" && !validateEmail(value)) {
    return "Invalid email format";
  }
  if (field === "Password" && !validatePassword(value)) {
    return "Password must be at least 6 characters";
  }
  return "";
};
