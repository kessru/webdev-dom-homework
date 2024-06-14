import { userName } from "./api.js";
import { commentPostListener, copyToRespond } from "./listeners.js";
import { renderLogin } from "./renderLogin.js";

export const renderInputForm = ({ comments, fetchGet }) => {

  const userInputHtml = document.getElementById("user-input");

  const inputForm = `    
<div class="add-form">
    <input type="text" class="add-form-name" id="nameFormId" value="${userName}" readonly/>
    <textarea type="textarea" class="add-form-text" id="textFormId" placeholder="Введите ваш коментарий"
      rows="4"></textarea>
    <div class="add-form-row">
      <button class="add-form-button" id="button">Написать</button>
    </div>
  </div>
  `;

  userInputHtml.innerHTML = inputForm;

  copyToRespond({ comments });
  commentPostListener({ fetchGet });
};


export const renderLoginLink = ({ comments, fetchGet }) => {

  const userInputHtml = document.getElementById("user-input");

  const linkButton = `
    <button class="add-form-button" id="authorisation-button">Чтобы добавить комментарий, авторизуйтесь</button>`;

  userInputHtml.innerHTML = linkButton;

  const authorisationButtonElement = document.getElementById("authorisation-button");

  authorisationButtonElement.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderLogin({ comments, fetchGet });
  });

};
