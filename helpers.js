export function getDate({ comment }) {

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

    return new Date(comment.date).getDate() + '.' + month + '.' + new Date(comment.date).getFullYear().toString().substr(-2) + ' ' + hour + ':' + minutes;
};

export function safeInput({ text }) {
    return `
    ${text
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")}
        `
}