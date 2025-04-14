export function initReplyHandlers() {
    document.querySelector('.comments').addEventListener('click', (event) => {
      const commentText = event.target.closest('.comment-text');
      if (!commentText) return;
  
      const textInput = document.querySelector('.add-form-text');
      const originalText = commentText.textContent.trim();
      
      textInput.value = originalText.startsWith('>') 
        ? originalText 
        : `> ${originalText}`;
    });
  }