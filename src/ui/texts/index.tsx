import React from "react";
import css from "./index.css";

export function TitleText({ text }) {
  return <h1 className={css.title}>{text}</h1>;
}
export function SubtitleText({ text }) {
  return <h2 className={css.subtitle}>{text}</h2>;
}
export function SubtitleBoldText({ text }) {
  return <h2 className={css.subtitleBold}>{text}</h2>;
}
export function BodyText({ text }) {
  return <p className={css.body}>{text}</p>;
}
export function BodyBoldText({ text }) {
  return <p className={css.bodyBold}>{text}</p>;
}
export function CaptionText({ text }) {
  return <p className={css.caption}>{text}</p>;
}
export function LinkText({ text, onClick }) {
  return (
    <a onClick={onClick} className={css.link}>
      {text}
    </a>
  );
}
