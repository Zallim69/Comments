// Функция для экранирования HTML-тегов в строках
export const sanitizeHTML = (str) => {
  return str.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
};

// Функция для очистки пользовательского ввода
export const sanitizeInput = (input) => {
  return input.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
};