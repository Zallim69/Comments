import { commentsData } from "./comments-data.js";
import { renderComments } from "./render-comments.js";

function showComment(text) {
  const textInput = document.querySelector(".add-form-text");
  const formattedText = text.trim().startsWith(">") 
    ? text.trim() 
    : `> ${text.trim()}`;
  textInput.value = formattedText;
}

function initEventHandlers() {
  // Like handler
  document.querySelector(".comments").addEventListener("click", (event) => {
    const likeButton = event.target.closest(".like-button");
    if (!likeButton) return;
    
    const commentElement = event.target.closest(".comment");
    const index = parseInt(commentElement.dataset.index);
    const comment = commentsData[index];
    
    comment.liked = !comment.liked;
    comment.likes += comment.liked ? 1 : -1;
    renderComments();
  });

  // Reply handler
  document.querySelector(".comments").addEventListener("click", (event) => {
    const commentText = event.target.closest(".comment-text");
    if (!commentText) return;
    
    const commentElement = event.target.closest(".comment");
    const index = parseInt(commentElement.dataset.index);
    showComment(commentsData[index].text);
  });

  // Add comment handler
  document.querySelector(".add-form-button").addEventListener("click", () => {
    const nameInput = document.querySelector(".add-form-name");
    const textInput = document.querySelector(".add-form-text");
    
    const name = nameInput.value.trim();
    const text = textInput.value.trim();

    if (!name || !text) {
      alert("Заполните оба поля!");
      return;
    }

    commentsData.push({
      name,
      date: new Date().toLocaleString(),
      text,
      likes: 0,
      liked: false,
    });

    nameInput.value = "";
    textInput.value = "";
    renderComments();
  });
}

export { initEventHandlers };