import { commentPostListener, copyToRespond, initLikeButtonListeners } from "./listeners.js";
import { safeInput } from "./helpers.js";
import { renderLogin } from "./renderLogin.js";

const renderAllElements = document.getElementById('renderAll');

export let userName;

export const setName = (newUserName) => {
    userName = newUserName;
};

export const renderComments = ({ comments, fetchGet }) => {

    const commentsHtml = comments.map((comment, index) => {

        return `
        <div class="container">
        <ul class="comments" id="commentsId">
          <li class="comment" data-index="${index}">
            <div class="comment-header">
              <div id="userName">${safeInput({ text: comment.name })}
              </div>
              <div>${comment.date}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text"> ${safeInput({ text: comment.text })}
              </div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button data-index="${index}" class="like-button ${comment.isLiked ? "-active-like" : ''}"></button>
              </div>
            </div>
          </li>
        </ul>
        <div id="user-input">
        <button class="add-form-button" id="authorisation-button">Чтобы добавить комментарий, авторизуйтесь</button>
        </div>
        </div>
    `}).join('');

    renderAllElements.innerHTML = commentsHtml;

    const authorisationButtonElement = document.getElementById("authorisation-button");

    authorisationButtonElement.addEventListener("click", () => {
        renderLogin({ comments, fetchGet });
    })

    initLikeButtonListeners({ comments, fetchGet });
    copyToRespond({ comments });



    // const commentsList = document.getElementById('commentsId');
    // commentsList.textContent = 'Пожалуйста подождите, комментарии загружаются...';


};

export const renderInputForm = ({ comments, fetchGet }) => {

    renderComments({ comments });

    const userInputHtml = document.getElementById("user-input");
    // const userNameElement = document.getElementById("userName");

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

    commentPostListener({ fetchGet });
};

