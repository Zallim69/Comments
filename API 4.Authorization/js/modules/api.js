// Базовый URL API для работы с комментариями
const API_URL = "https://wedev-api.sky.pro/api/v2/zal-zal/comments";
const AUTH_URL = " https://wedev-api.sky.pro/api/user/login";
export let user = null;
// Функция для получения списка комментариев с сервера
export function set_user(value) {
user = value
}
export const getComments = () => {
  return fetch(API_URL, { method: "GET" }).then((response) => {
    // Проверка успешности ответа
    if (!response.ok) throw new Error("Failed to fetch comments");
    return response.json();
  });
};

// Функция для отправки нового комментария на сервер
export const postComment = (name, text, user
) => {
  return fetch(API_URL, {
    method: "POST",
    headers:{
      authorization: 'Bearer '+user.token
    },
    body: JSON.stringify({
      name,
      text,
      forceError: true, // Искусственное создание ошибок для тестирования
    }),
  }).then((response) => {
    // Обработка различных статусов ответа
    if (response.status === 400) throw new Error("Bad request");
    if (response.status === 500) throw new Error("Server error");
    return response.json();
  });
};

//Функция для отправки логина и пароля
export const login_Auth = (login, password) => {
  return fetch(AUTH_URL, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    // Обработка различных статусов ответа
    if (response.status === 400) throw new Error("Bad request");
    if (response.status === 500) throw new Error("Server error");
    return response.json();
  });
};
