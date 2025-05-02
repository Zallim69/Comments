// Импорт функции инициализации приложения
import { initApp } from './modules/comments.js';

// Запуск инициализации после полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});