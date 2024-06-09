import { commentPostListener } from "./listeners.js";
import { renderComments } from "./renderComments.js";
import { renderLogin } from "./renderLogin.js";

export const renderInputForm = ({ comments, fetchGet }) => {

    renderComments({ comments, fetchGet });

    const userInputHtml = document.getElementById("user-input");

    const inputForm = `
    <div class="add-form">
    <input type="text" class="add-form-name" id="nameFormId" placeholder="Введите ваше имя" />
    <textarea type="textarea" class="add-form-text" id="textFormId" placeholder="Введите ваш коментарий"
      rows="4"></textarea>
    <div class="add-form-row">
      <button class="add-form-button" id="button">Написать</button>
    </div>
  </div>`;

    userInputHtml.innerHTML = inputForm;


    commentPostListener({ comments, fetchGet });
};


export const renderLoginLink = ({ comments, fetchGet }) => {

    const userInputHtml = document.getElementById("user-input");

    const linkButton = `
    <button class="add-form-button" id="authorisation-button">Чтобы добавить комментарий, авторизуйтесь</button>`;

    userInputHtml.innerHTML = linkButton;

    const authorisationButtonElement = document.getElementById("authorisation-button");

    authorisationButtonElement.addEventListener("click", () => {
        renderLogin({ comments, fetchGet });
    });

};

// export const renderUserInput = () => {

// }