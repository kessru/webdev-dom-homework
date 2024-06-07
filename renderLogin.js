import { login, setToken } from "./api.js";
import { renderInputForm, setName } from "./renderComments.js";

export const renderLogin = ({ comments, fetchGet }) => {
    const renderAllElements = document.getElementById('renderAll');


    const loginHtml = `
    <div class="container">
    <div class="login-form">
      <input type="text" class="add-form-name" id="login-input" placeholder="Логин" />
      <input type="text" class="add-form-password" id="password-input" placeholder="Пароль"></input>
      <div class="login-row">
        <button class="login-button" id="loginButton">Войти</button>
      </div>
    </div>
  </div>`;

    renderAllElements.innerHTML = loginHtml;

    const loginButtonElement = document.getElementById("loginButton");
    const loginInputElement = document.getElementById("login-input");
    const passwordInputElement = document.getElementById("password-input");

    loginButtonElement.addEventListener("click", () => {
        login({
            login: loginInputElement.value,
            password: passwordInputElement.value,
        })
            .then((responseData) => {
                setToken(responseData.user.token);
                setName(responseData.user.name);
            })
            .then(() => {
                renderInputForm({ comments, fetchGet });
            })
    });
};


