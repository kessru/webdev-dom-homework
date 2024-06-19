import { login, setToken, setUserName } from "./api.js";
import { renderComments } from "./renderComments.js";
import { renderInputForm } from "./renderUserInput.js";

export const renderLogin = ({ comments, fetchGet }) => {

    const renderAllElements = document.getElementById('container');

    const loginHtml = `
    <ul class="comments" id="commentsId"></ul>
    <div id="user-input">
    <div class="logib-box">
    <div class="login-form">
      <input type="text" class="add-form-name" id="login-input" placeholder="Логин" />
      <input type="text" class="add-form-password" id="password-input" placeholder="Пароль"></input>
      <div class="login-row">
        <button class="login-button" id="loginButton">Войти</button>
      </div>
    </div>
  </div>
  </div>`;

    renderAllElements.innerHTML = loginHtml;

    const loginButtonElement = document.getElementById("loginButton");
    const loginInputElement = document.getElementById("login-input");
    const passwordInputElement = document.getElementById("password-input");

    loginButtonElement.addEventListener("click", () => {

        if (loginInputElement.value.trim() === '' || passwordInputElement.value.trim() === '') {
            alert('Введите логин и пароль');
            return;
        };

        login({
            login: loginInputElement.value.trim(),
            password: passwordInputElement.value.trim(),
        })
            .then((responseData) => {
                setToken(responseData.user.token);
                setUserName(responseData.user.name);
            })
            .then(() => {
                renderComments({ comments, fetchGet });
                renderInputForm({ comments, fetchGet });
            })
            .catch((error) => {
                alert(error.message);
            });
    });
};


