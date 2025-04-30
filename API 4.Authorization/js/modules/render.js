// js/modules/render.js
import { user } from "./api.js";
import { render_Login } from "./form_auth.js";
import { sanitizeHTML } from "./sanitize.js";

export const renderComments = (commentsData) => {
  const commentsList = document.querySelector(".comments");
  commentsList.innerHTML = "";

  // Рендерим комментарии
  commentsData.forEach((comment) => {
    const newComment = document.createElement("li");
    newComment.classList.add("comment");

    newComment.innerHTML = `
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${sanitizeHTML(comment.text)}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="like-button ${
            comment.liked ? "-active-like" : ""
          }"></button>
        </div>
      </div>
    `;
    commentsList.appendChild(newComment);
  });

  // Добавляем ссылку авторизации один раз после всех комментариев
  if (!user && !document.getElementById('login-text_id')) {
    const loginText = `<div id="login-text_id">Чтобы оставить комментарий, <span class="login-text">авторизуйтесь</span></div>`;
    commentsList.insertAdjacentHTML("afterend", loginText);

    const loginEl = document.querySelector(".login-text");
    loginEl.addEventListener("click", () => {
      render_Login();
      document.getElementById('login-text_id')?.remove();
    });
  }
};