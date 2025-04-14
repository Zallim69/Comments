import { getComments, postComment } from './api.js';
import { renderComments } from './render.js';
import { initHandlers } from './handlers.js';

export let commentsData = []; // Экспортируем массив, чтобы handlers.js мог его обновлять

export const initApp = () => {
  const loader = document.createElement("div");
  loader.classList.add("loader");
  loader.innerText = "Пожалуйста подождите, комментарии загружаются";
  document.body.appendChild(loader);

  loadComments()
    .then(() => {
      document.body.removeChild(loader);
      initHandlers(renderComments, loadComments); // Убрали передачу commentsData
    })
    .catch((error) => {
      console.error("Error initializing app:", error);
      document.body.removeChild(loader);
    });
};

export const loadComments = () => {
  return getComments()
    .then((data) => {
      commentsData = data.comments.map(comment => ({
        name: comment.author.name,
        date: new Date(comment.date).toLocaleString(),
        text: comment.text,
        likes: comment.likes,
        liked: false
      }));
      renderComments(commentsData);
    });
};

export const addComment = (name, text) => {
  return postComment(name, text)
    .then(() => loadComments());
};