import { renderComments } from "./renderComments.js";

const userName = document.getElementById('nameFormId');
const userComment = document.getElementById('textFormId');

export const initLikeButtonListeners = ({ comments }) => {
    const likeButtons = document.querySelectorAll('.like-button');

    for (const likeButton of likeButtons) {

        likeButton.addEventListener('click', (event) => {

            event.stopPropagation();

            const index = likeButton.dataset.index;

            if (comments[index].isLiked === true) {
                comments[index].isLiked = false;
                comments[index].likes -= 1;
            } else {
                comments[index].isLiked = true;
                comments[index].likes += 1;
            };

        });
    };
    // renderComments({ comments });
};

export const copyToRespond = ({ comments }) => {

    const commentEls = document.querySelectorAll(".comment");

    for (const commentEl of commentEls) {

        const commentIndex = commentEl.dataset.index;

        commentEl.addEventListener('click', () => {

            userComment.value = `> ${comments[commentIndex].name} "${comments[commentIndex].text}"`;

        });
    };
};