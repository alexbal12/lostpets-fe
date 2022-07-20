import React from "react";
import css from "./index.css";

function ButtonSearch({ text }) {
  return <button className={css.root}>{text}</button>;
}

export { ButtonSearch };
