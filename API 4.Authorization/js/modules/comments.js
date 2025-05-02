import { getComments, postComment, user } from './api.js';
import { renderComments } from './render.js';
import { initHandlers } from './handlers.js';
import { render_form } from './render_form.js';

export let commentsData = [];

export const initApp = () => {
  // Очистка предыдущих элементов
  document.querySelector('.auth-form')?.remove();
  document.querySelector('#login-text_id')?.remove();

  const loader = document.createElement("div");
  loader.className = "loader";
  loader.textContent = "Загрузка комментариев...";
  document.body.append(loader);

  loadComments()
    .then(() => {
      if (user) render_form();
      initHandlers(renderComments);
    })
    .catch(error => {
      alert(`Ошибка загрузки: ${error.message}`);
    })
    .finally(() => loader.remove());
};

export const loadComments = () => {
  return getComments()
    .then(data => {
      commentsData = data.comments.map(comment => ({
        name: comment.author.name || "Аноним",
        date: new Date(comment.date).toLocaleString() || new Date().toLocaleString(),
        text: comment.text || "",
        likes: Number(comment.likes) || 0,
        liked: false
      }));
      renderComments(commentsData);
      return commentsData;
    });
};

export const addComment = (name, text) => {
  return postComment(name, text, user)
    .then(loadComments)
    .catch(error => {
      throw new Error(`Ошибка отправки: ${error.message}`);
    });
};