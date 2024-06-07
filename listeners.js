import { postComment } from "./api.js";
import { renderComments, renderInputForm } from "./renderComments.js";

const userName = document.getElementById('nameFormId');
const userComment = document.getElementById('textFormId');

export const initLikeButtonListeners = ({ comments, fetchGet }) => {
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

            renderInputForm({ comments, fetchGet });
        });
    };
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

export function commentPostListener({ fetchGet }) {

    const submitBtn = document.getElementById('button');

    submitBtn.addEventListener("click", () => {

        if (userName.value === '' || userComment.value === '') {
            alert('Введите данные');
            submitBtn.disabled = true;
            return;
        };

        submitBtn.disabled = false;

        submitBtn.textContent = "Комментарий добавляется";
        submitBtn.disabled = true;


        postComment({
            name: userName.value,
            text: userComment.value,
        })
            .then((response) => {
                if (response.status === 201) {
                    return fetchGet();
                } else if (response.status === 400) {
                    throw new Error('User error');
                } else if (response.status === 500) {
                    throw new Error('Bad request');
                };
            })
            .then(() => {
                submitBtn.textContent = "Написать";
                submitBtn.disabled = false;
                userName.value = '';
                userComment.value = '';
            })
            .catch((error) => {
                if (error.message === "Bad request") {
                    alert("Сервер сломался, попробуй позже");
                    submitBtn.textContent = "Написать";
                    submitBtn.disabled = false;
                    console.log(error.message);
                } else if (error.message === 'User error') {
                    alert("Имя и комментарий должны быть не короче 3 символов");
                    submitBtn.textContent = "Написать";
                    submitBtn.disabled = false;
                    console.log(error.message);
                } else {
                    alert('Кажется, у вас сломался интернет, попробуйте позже');
                    submitBtn.textContent = "Написать";
                    submitBtn.disabled = false;
                    console.log(error.message);
                };
            })
    });

    userComment.addEventListener("keyup", (event) => {
        submitBtn.disabled = false;
        if (event.key === "Enter") {
            if (userName.value === '' || userComment.value === '') {
                alert('Введите данные');
                submitBtn.disabled = true;
                return;
            };
            submitBtn.disabled = false;
            submitBtn.click();
            fetchGet();
        };
    });

};
