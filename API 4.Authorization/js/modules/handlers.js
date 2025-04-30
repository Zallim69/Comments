// Импорт зависимостей
import { sanitizeInput } from './sanitize.js';
import { addComment, commentsData } from './comments.js';
import { user } from './api.js'

// Инициализация обработчиков событий
export const initHandlers = (renderComments, loadComments) => {
  // Получение элементов DOM
  const addButton = document.querySelector(".add-form-button");
  const nameInput = document.querySelector(".add-form-name");
  const textInput = document.querySelector(".add-form-text");
  const addForm = document.querySelector(".add-form");
  const commentsList = document.querySelector(".comments");

  // Обработчик клика на кнопку отправки(Мы будем этим зханиматься, только если есть авторизация)
  if (user) {addButton.addEventListener("click", () => {
    // Санитизация и проверка ввода
    const name = sanitizeInput(nameInput.value.trim());
    const text = sanitizeInput(textInput.value.trim());

    // Валидация полей
    if (!name || !text) {
      alert("Имя и комментарий не могут быть пустыми");
      return;
    }

    // Проверка подключения к интернету
    if (!navigator.onLine) {
      alert("У пользователя пропал интернет");
      return;
    }

    // Показать сообщение о загрузке
    const loadingMessage = document.createElement("div");
    loadingMessage.innerText = "Комментарий добавляется";
    addForm.replaceWith(loadingMessage);

    // Отправка комментария
    addComment(name, text)
      .then(() => {
        // Очистка полей после успешной отправки
        nameInput.value = "";
        textInput.value = "";
      })
      .catch((error) => {
        handlePostError(error);
      })
      .finally(() => {
        // Восстановление формы
        loadingMessage.replaceWith(addForm);
      });
  }); 
}

  // Обработчик событий для списка комментариев
  commentsList.addEventListener("click", (event) => {
    // Обработчик лайков. Дополнить условие оператором && проверкой на авторизацию
    if (event.target.classList.contains("like-button")&& user) {
      const commentElement = event.target.closest(".comment");
      const commentIndex = Array.from(commentsList.children).indexOf(commentElement);
      const comment = commentsData[commentIndex];

      // Обновление состояния лайка
      comment.liked = !comment.liked;
      comment.likes += comment.liked ? 1 : -1;
      renderComments(commentsData);
    } else {
      alert('Вам нужно авторизоваться');
    }

    // Обработчик цитирования, дополнить условие оператом &&
    if (event.target.classList.contains("comment-text") && user) {
      const commentText = event.target.textContent;
      const formattedText = commentText.trim().startsWith(">")
        ? commentText.trim()
        : "> " + commentText.trim();
      textInput.value = formattedText;
    }
  });
};

// Обработчик ошибок при отправке
const handlePostError = (error) => {
  console.error("Error sending comment:", error);
  if (error.message === "Bad request") {
    alert("Имя и комментарий должны быть не короче 3-х символов");
  } else if (error.message === "Server error") {
    alert("Сервер сломался, попробуйте позже");
  }
};