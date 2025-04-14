import { commentsData } from "../comments-data.js";
import { renderComments } from "../render-comments.js";

let isHandlersInitialized = false;

export function initLikeHandlers() {
  if (isHandlersInitialized) return;
  
  document.querySelector('.comments').addEventListener('click', (event) => {
    const likeButton = event.target.closest('.like-button');
    if (!likeButton) return;

    const commentElement = event.target.closest('.comment');
    const index = parseInt(commentElement.dataset.index);
    const comment = commentsData[index];
    
    comment.liked = !comment.liked;
    comment.likes += comment.liked ? 1 : -1;
    
    renderComments();
  });

  isHandlersInitialized = true;
}