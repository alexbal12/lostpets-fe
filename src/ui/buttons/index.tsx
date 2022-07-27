import React from "react";
import css from "./index.css";

export function ButtonPink({ text, onClick }) {
  return (
    <button onClick={onClick} className={css.pink}>
      {text}
    </button>
  );
}
export function ButtonGreen({ text, onClick }) {
  return (
    <button onClick={onClick} className={css.green}>
      {text}
    </button>
  );
}
export function ButtonGray({ text, onClick }) {
  return (
    <button onClick={onClick} className={css.gray}>
      {text}
    </button>
  );
}
