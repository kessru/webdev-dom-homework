const commentsURL = "https://wedev-api.sky.pro/api/v2/kseniia-ovechkina/comments";
const userURL = "https://wedev-api.sky.pro/api/user/login";

export let token;

export const setToken = (newToken) => {
    token = newToken;
};

export let userName;

export const setUserName = (newUserName) => {
    userName = newUserName;
};

export function getComments() {
    return fetch(commentsURL, {
        method: "GET",
    }).then((response) => {
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 500) {
            throw new Error('Bad request');
        };
    });
};

export function postComment({ name, text }) {
    return fetch(commentsURL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            name: name,
            text: text,
            // forceError: true,
        }),
    });
};

export function login({ login, password }) {
    return fetch(userURL, {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        })
    }).then((response) => {
        if (response.status === 400) {
            throw new Error("Введены неверные данные");
        }
        return response.json()
    });
};