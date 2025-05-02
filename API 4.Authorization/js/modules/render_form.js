import { user } from "./api.js";

export function render_form () {
    const form = document.querySelector(".form");
form.innerHTML = 
`<div class="add-form">
<input
  type="text"
  value='${user.name}'
  readonly
  class="add-form-name"
  placeholder="Введите Ваше имя"
/>
<textarea
  type="textarea"
  class="add-form-text"
  placeholder="Введите Ваш комментарий"
  rows="4"
></textarea>
<div class="add-form-row">
  <button class="add-form-button">Написать</button>
</div>
</div>` 
}