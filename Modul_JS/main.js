import { renderComments } from "./render-comments.js";
import { initAddCommentHandler } from "./event-handlers/add-comment.js";

// Первоначальный рендер
renderComments();

// Инициализация обработчика добавления комментария
initAddCommentHandler();