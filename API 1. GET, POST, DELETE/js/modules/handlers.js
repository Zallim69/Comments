import { sanitizeInput } from './sanitize.js';
import { addComment, commentsData } from './comments.js'; // Импортируем commentsData

export const initHandlers = (renderComments, loadComments) => {
  const addButton = document.querySelector(".add-form-button");
  const nameInput = document.querySelector(".add-form-name");
  const textInput = document.querySelector(".add-form-text");
  const addForm = document.querySelector(".add-form");
  const commentsList = document.querySelector(".comments");

  // Обработчик добавления комментария
  addButton.addEventListener("click", () => {
    const name = sanitizeInput(nameInput.value.trim());
    const text = sanitizeInput(textInput.value.trim());

    if (!name || !text) {
      alert("Имя и комментарий не могут быть пустыми");
      return;
    }

    if (!navigator.onLine) {
      alert("У пользователя пропал интернет");
      return;
    }

    const loadingMessage = document.createElement("div");
    loadingMessage.innerText = "Комментарий добавляется";
    addForm.replaceWith(loadingMessage);

    addComment(name, text)
      .then(() => {
        nameInput.value = "";
        textInput.value = "";
      })
      .catch((error) => {
        handlePostError(error);
      })
      .finally(() => {
        loadingMessage.replaceWith(addForm);
      });
  });

  // Обработчик лайков (теперь работает с актуальными данными)
  commentsList.addEventListener("click", (event) => {
    if (event.target.classList.contains("like-button")) {
      const commentElement = event.target.closest(".comment");
      const commentIndex = Array.from(commentsList.children).indexOf(commentElement);
      const comment = commentsData[commentIndex]; // Используем импортированный массив

      comment.liked = !comment.liked;
      comment.likes += comment.liked ? 1 : -1;
      renderComments(commentsData); // Передаем актуальные данные
    }

    if (event.target.classList.contains("comment-text")) {
      const commentText = event.target.textContent;
      const formattedText = commentText.trim().startsWith(">")
        ? commentText.trim()
        : "> " + commentText.trim();
      textInput.value = formattedText;
    }
  });
};

const handlePostError = (error) => {
  console.error("Error sending comment:", error);
  if (error.message === "Bad request") {
    alert("Имя и комментарий должны быть не короче 3-х символов");
  } else if (error.message === "Server error") {
    alert("Сервер сломался, попробуйте позже");
  }
};