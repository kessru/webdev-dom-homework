"use strict";

import { getComments } from "./api.js";
import { postComment } from "./api.js";
import { renderCom } from "./render.js";

const commentsList = document.getElementById('commentsId');
// const deleteBtn = document.getElementById('delBtn');
const userName = document.getElementById('nameFormId');
const userComment = document.getElementById('textFormId');
const submitBtn = document.getElementById('button');

let comments = [];

commentsList.textContent = 'Пожалуйста подождите, комментарии загружаются...';

const fetchGet = () => {

    getComments().then((responseData) => {
        const appComments = responseData.comments.map((comment) => {

            let month = new Date(comment.date).getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            };

            let hour = new Date(comment.date).getHours();
            if (hour < 10) {
                hour = '0' + hour;
            };

            let minutes = new Date(comment.date).getMinutes();
            if (minutes < 10) {
                minutes = '0' + minutes;
            };

            const commentDate = new Date(comment.date).getDate() + '.' + month + '.' + new Date(comment.date).getFullYear().toString().substr(-2) + ' ' + hour + ':' + minutes;

            return {
                name: comment.author.name,
                date: commentDate,
                text: comment.text,
                likes: comment.likes,
                isLiked: false,
            };
        });

        comments = appComments;

        renderComments();
    })
        .catch((error) => {
            if (error.message === "Bad request") {
                alert("Сервер сломался, попробуй позже");
                console.log(error.message);
                return;
            } else {
                alert('Кажется, у вас сломался интернет, попробуйте позже');
                console.log(error.message);
                return;
            };
        });
};

fetchGet();

const initLikeButtonListeners = () => {
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

            renderComments();

        });
    };
};

const copyToRespond = () => {

    const commentEls = document.querySelectorAll(".comment");

    for (const commentEl of commentEls) {

        const commentIndex = commentEl.dataset.index;

        commentEl.addEventListener('click', () => {

            userComment.value = `> ${comments[commentIndex].name} "${comments[commentIndex].text}"`;

            renderComments();
        });
    };
};

const renderComments = () => {

    renderCom(comments, commentsList);

    initLikeButtonListeners();
    copyToRespond();

};

const clickEvent = () => {
    if (userName.value === '' || userComment.value === '') {
        alert('Введите данные');
        submitBtn.disabled = true;
        return;
    };

    submitBtn.disabled = false;

    // commentForm.textContent = "Комментарий добавляется";
    // commentForm.style.display = 'none';


    submitBtn.textContent = "Комментарий добавляется";
    submitBtn.disabled = true;


    postComment({
        name: userName.value,
        text: userComment.value,
    }).then((response) => {
        if (response.status === 201) {
            return fetchGet();
        } else if (response.status === 400) {
            throw new Error('User error');
        } else if (response.status === 500) {
            throw new Error('Bad request');
        };
    })
        .then(() => {
            // не знаю что написать в commentForm.textContent чтобы вернуть форму добаления
            // commentForm.style.display = 'flex';
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
};

submitBtn.addEventListener("click", clickEvent);

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




console.log("It works!");