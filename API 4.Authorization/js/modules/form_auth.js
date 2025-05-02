import { login_Auth, set_user } from "./api.js";
import { initApp } from "./comments.js";

export const render_Login = () => {
  const container = document.querySelector(".container");
  
  // Удаляем предыдущую форму если существует
  const existingForm = document.querySelector(".auth-form");
  if (existingForm) existingForm.remove();

  const login_Form = `
    <div class="auth-form">
      <h2>Авторизация</h2>
      <div class="input-group">
        <input 
          type="text" 
          id="login-input" 
          placeholder="Логин"
          autocomplete="username"
          class="auth-input"
        />
      </div>
      <div class="input-group">
        <input 
          type="password" 
          id="pass-input" 
          placeholder="Пароль"
          autocomplete="current-password"
          class="auth-input"
        />
      </div>
      <button class="login-btn">
        <span class="btn-text">Войти</span>
      </button>
    </div>`;

  container.insertAdjacentHTML("beforeend", login_Form);

  const login_btn = document.querySelector(".login-btn");
  const authForm = document.querySelector(".auth-form");
  const inputs = document.querySelectorAll(".auth-input");

  // Анимация при фокусе
  inputs.forEach(input => {
    input.addEventListener("focus", () => {
      input.parentElement.style.transform = "scale(1.02)";
    });
    
    input.addEventListener("blur", () => {
      input.parentElement.style.transform = "scale(1)";
    });
  });

  const handleLoginSuccess = (login_data) => {
    authForm.style.opacity = "0";
    authForm.style.transform = "translateY(50px)";
    
    return new Promise(resolve => {
      setTimeout(() => {
        authForm.remove();
        resolve(login_data);
      }, 300);
    });
  };

  login_btn.addEventListener("click", () => {
    const btnText = login_btn.querySelector(".btn-text");
    btnText.textContent = "Авторизация...";
    login_btn.classList.add("loading");
    
    const login_input = document.getElementById("login-input");
    const pass_input = document.getElementById("pass-input");

    login_Auth(login_input.value, pass_input.value)
      .then(handleLoginSuccess)
      .then((login_data) => {
        set_user(login_data.user);
        initApp();
      })
      .catch((error) => {
        login_btn.classList.add("error");
        setTimeout(() => login_btn.classList.remove("error"), 1000);
        alert("Ошибка авторизации: " + error.message);
      })
      .finally(() => {
        btnText.textContent = "Войти";
        login_btn.classList.remove("loading");
      });
  });

  // Закрытие формы при клике вне области
  document.addEventListener("click", (e) => {
    if (!authForm.contains(e.target) && !e.target.closest(".login-text")) {
      authForm.style.opacity = "0";
      setTimeout(() => authForm.remove(), 300);
    }
  }, { once: true });
};