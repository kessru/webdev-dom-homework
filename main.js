"use strict";

import { getComments, postComment } from "./api.js";
import { getDate } from "./helpers.js";
import { renderComments } from "./renderComments.js";

const commentsList = document.getElementById('commentsId');
const userName = document.getElementById('nameFormId');
const userComment = document.getElementById('textFormId');
const submitBtn = document.getElementById('button');

let comments = [];

commentsList.textContent = 'Пожалуйста подождите, комментарии загружаются...';

const fetchGet = () => {

    getComments().then((responseData) => {
        const appComments = responseData.comments.map((comment) => {

            return {
                name: comment.author.name,
                date: getDate({ comment }),
                text: comment.text,
                likes: comment.likes,
                isLiked: false,
            };
        });

        comments = appComments;

        renderComments({ comments });
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

const clickEvent = () => {
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




console.log("It works hopefully!");