import { copyToRespond, initLikeButtonListeners } from "./listeners.js";
import { safeInput } from "./helpers.js";

export let userName;

export const setName = (newUserName) => {
    userName = newUserName;
};

export const renderComments = ({ comments, fetchGet }) => {

    const commentsList = document.getElementById('commentsId');

    const commentsHtml = comments.map((comment, index) => {

        return `
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
    `}).join('');

    commentsList.innerHTML = commentsHtml;

    initLikeButtonListeners({ comments, fetchGet });
    copyToRespond({ comments });

    // const commentsList = document.getElementById('commentsId');
    // commentsList.textContent = 'Пожалуйста подождите, комментарии загружаются...';

};
