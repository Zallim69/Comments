import { sanitizeInput } from './sanitize.js';
import { addComment, commentsData, loadComments } from './comments.js';
import { user } from './api.js';

let clickHandler = null;
let addButtonHandler = null;

const handlePostError = (error) => {
  console.error("Error sending comment:", error);
  if (error.message === "Bad request") {
    alert("Имя и комментарий должны быть не короче 3-х символов");
  } else if (error.message === "Server error") {
    alert("Сервер сломался, попробуйте позже");
  }
};

export const initHandlers = (renderComments) => {
  const addButton = document.querySelector(".add-form-button");
  const nameInput = document.querySelector(".add-form-name");
  const textInput = document.querySelector(".add-form-text");
  const addForm = document.querySelector(".add-form");
  const commentsList = document.querySelector(".comments");

  // Удаляем предыдущие обработчики
  if (clickHandler) commentsList.removeEventListener('click', clickHandler);
  if (addButtonHandler) addButton.removeEventListener('click', addButtonHandler);

  // Обработчик отправки комментария
  addButtonHandler = () => {
    const name = sanitizeInput(nameInput.value.trim());
    const text = sanitizeInput(textInput.value.trim());

    if (!name || !text) {
      alert("Имя и комментарий не могут быть пустыми");
      return;
    }

    if (!navigator.onLine) {
      alert("Нет интернет-соединения");
      return;
    }

    const loadingMessage = document.createElement("div");
    loadingMessage.innerText = "Добавляем комментарий...";
    addForm.replaceWith(loadingMessage);

    addComment(name, text)
      .then(() => {
        textInput.value = ""; // Очищаем ТОЛЬКО поле с текстом
      })
      .catch(handlePostError)
      .finally(() => loadingMessage.replaceWith(addForm));
  };

  if (user) addButton.addEventListener("click", addButtonHandler);

  // Обработчик взаимодействий с комментариями
  clickHandler = (event) => {
    if (!user) {
      alert("Авторизуйтесь");
      return;
    }

    // Лайки
    if (event.target.classList.contains("like-button")) {
      const commentElement = event.target.closest(".comment");
      if (!commentElement) return;

      const commentIndex = Array.from(commentsList.children).indexOf(commentElement);
      if (commentIndex === -1) return;

      const comment = commentsData[commentIndex];
      comment.liked = !comment.liked;
      comment.likes = comment.liked ? comment.likes + 1 : comment.likes - 1;
      renderComments(commentsData);
    }

    // Цитирование
    if (event.target.classList.contains("comment-text")) {
      const commentText = event.target.textContent.trim();
      textInput.value = commentText.startsWith(">") 
        ? `${commentText}\n` 
        : `> ${commentText}\n`;
    }
  };

  commentsList.addEventListener('click', clickHandler);
};