import { copyToRespond, initLikeButtonListeners } from "./listeners.js";

const commentsList = document.getElementById('commentsId');

export const renderComments = ({ comments }) => {

    const commentsHtml = comments.map((comment, index) => {

        return `
        <li class="comment" data-index="${index}">
      <div class="comment-header">
        <div>${comment.name
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;")}
        </div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
         ${comment.text
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;")}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter" id="likesCounterId">${comment.likes}</span>
          <button data-index="${index}" class="like-button ${comment.isLiked ? "-active-like" : ''}"></button>
        </div>
      </div>
    </li>
    `}).join('');

    commentsList.innerHTML = commentsHtml;

    initLikeButtonListeners({ comments }); /* Doesn't work */
    copyToRespond({ comments });

};
