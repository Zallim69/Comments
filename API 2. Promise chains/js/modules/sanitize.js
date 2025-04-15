export const sanitizeHTML = (str) => {
  return str.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
};

export const sanitizeInput = (input) => {
  return input.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
};