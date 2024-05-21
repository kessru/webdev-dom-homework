export function getComments() {
    return fetch("https://wedev-api.sky.pro/api/v1/kseniia-ovechkina/comments", {
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
    return fetch("https://wedev-api.sky.pro/api/v1/kseniia-ovechkina/comments", {
        method: "POST",
        body: JSON.stringify({
            name: name,
            text: text,
            // forceError: true,
        }),
    });    
};