export let date;

export const getDate = ({ comment }) => {

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

    let commentDate = new Date(comment.date).getDate() + '.' + month + '.' + new Date(comment.date).getFullYear().toString().substr(-2) + ' ' + hour + ':' + minutes;

    return date = commentDate;

};

// export const safeInput = () => {
//     .replaceAll("&", "&amp;")
//     .replaceAll("<", "&lt;")
//     .replaceAll(">", "&gt;")
//     .replaceAll('"', "&quot;")
// }