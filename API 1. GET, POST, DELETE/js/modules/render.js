import { sanitizeHTML } from './sanitize.js';

export const renderComments = (commentsData) => {
  const commentsList = document.querySelector(".comments");
  commentsList.innerHTML = "";

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
          <button class="like-button ${comment.liked ? "-active-like" : ""}"></button>
        </div>
      </div>
    `;

    commentsList.appendChild(newComment);
  });
};