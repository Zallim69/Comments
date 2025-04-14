import { commentsData } from "../comments-data.js";
import { renderComments } from "../render-comments.js";

export function initAddCommentHandler() {
  document.querySelector('.add-form-button').addEventListener('click', () => {
    const nameInput = document.querySelector('.add-form-name');
    const textInput = document.querySelector('.add-form-text');
    
    const name = nameInput.value.trim();
    const text = textInput.value.trim();

    if (!name || !text) {
      alert('Заполните оба поля!');
      return;
    }

    commentsData.push({
      name,
      date: new Date().toLocaleString(),
      text,
      likes: 0,
      liked: false,
    });

    nameInput.value = '';
    textInput.value = '';
    renderComments();
  });
}