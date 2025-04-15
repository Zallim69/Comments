const API_URL = "https://wedev-api.sky.pro/api/v1/zalim-zalim/comments";

export const getComments = () => {
  return fetch(API_URL, { method: "GET" })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch comments");
      return response.json();
    });
};

export const postComment = (name, text) => {
  return fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ name, text, forceError: true }),
  })
    .then((response) => {
      if (response.status === 400) throw new Error("Bad request");
      if (response.status === 500) throw new Error("Server error");
      return response.json();
    });
};