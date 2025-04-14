import { commentsData } from "./comments-data.js";
import { sanitizeHTML } from "./sanitize.js";

export function renderComments() {
  const commentsList = document.querySelector(".comments");
  commentsList.innerHTML = "";

  commentsData.forEach((comment, index) => {
    const newComment = document.createElement("li");
    newComment.className = "comment";
    newComment.dataset.index = index;

    newComment.innerHTML = `
      <div class="comment-header">
        <div>${sanitizeHTML(comment.name)}</div>
        <div>${sanitizeHTML(comment.date)}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">${sanitizeHTML(comment.text)}</div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="like-button ${comment.liked ? "-active-like" : ""}"></button>
        </div>
      </div>
    `;

    commentsList.appendChild(newComment);
  });
}