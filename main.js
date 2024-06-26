"use strict";

import { getComments, token } from "./api.js";
import { getDate } from "./helpers.js";
import { renderComments } from "./renderComments.js";
import { renderLoginLink } from "./renderUserInput.js";

export let comments = [];

export const fetchGet = () => {

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

        renderComments({ comments, fetchGet });
    }).then(() => {
        if (!token) {
            renderLoginLink({ comments, fetchGet });
        };
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

console.log("It works hopefully!");