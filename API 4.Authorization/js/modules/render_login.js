export const render_Login = () => {
    const container = document.querySelector(".container");
    
    // Добавляем класс для затемнения основного контента
    container.classList.add("auth-form-active");
  
    const login_Form = `
      <div class="auth-form">
        <!-- содержимое формы -->
      </div>`;
  
    container.insertAdjacentHTML("beforeend", login_Form);
  
    // При закрытии формы
    const closeForm = () => {
      container.classList.remove("auth-form-active");
      document.querySelector(".auth-form")?.remove();
    };
  
    // Добавляем обработчик закрытия при успешной авторизации
    login_btn.addEventListener("click", () => {
      // ... существующий код ...
      setTimeout(() => {
        closeForm();
        // ... остальной код ...
      }, 300);
    });
  };