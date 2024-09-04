import { format } from "date-fns";

export function getDate({ comment }) {
  return format(new Date(comment.date), "yyyy-MM-dd hh.mm.ss");
}

export function safeInput({ text }) {
  return `
    ${text
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")}
        `;
}
