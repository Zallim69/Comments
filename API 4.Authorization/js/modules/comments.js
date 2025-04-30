// Импорт зависимостей
import { getComments, postComment, user } from './api.js';
import { renderComments } from './render.js';
import { initHandlers } from './handlers.js';
import { render_form } from './render_form.js';

// Глобальное хранилище комментариев
export let commentsData = [];

// Основная функция инициализации приложения
export const initApp = () => {
  // Создание индикатора загрузки
  const loader = document.createElement("div");
  loader.classList.add("loader");
  loader.innerText = "Пожалуйста подождите, комментарии загружаются";
  document.body.appendChild(loader);

  // Загрузка комментариев и инициализация обработчиков
  loadComments()
    .then(() => {
      document.body.removeChild(loader);
      if (user) {
        render_form ()
      }
      initHandlers(renderComments, loadComments); 
})
    .catch((error) => {
      console.error("Error initializing app:", error);
      document.body.removeChild(loader);
    });
};

// Функция загрузки и обработки комментариев
export const loadComments = () => {
  return getComments()
    .then((data) => {
      // Преобразование данных от API в нужный формат
      commentsData = data.comments.map(comment => ({
        name: comment.author.name,
        date: new Date(comment.date).toLocaleString(),
        text: comment.text,
        likes: comment.likes,
        liked: false // Флаг лайка для UI
      }));
      renderComments(commentsData);
    });
};

// Функция добавления нового комментария
export const addComment = (name, text) => {
  return postComment(name, text, user
  )
    .then(() => loadComments()); // Перезагрузка списка после успешной отправки
};