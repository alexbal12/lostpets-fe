import React from "react";
import css from "./index.css";

type BtnType = {
  text: string;
  handleClick?: () => void;
  type?: "submit" | "button";
};
export function ButtonPink(props: BtnType) {
  const { text, handleClick, type } = props;
  return (
    <button type={type} className={css.pink} onClick={handleClick}>
      {text}
    </button>
  );
}
export function ButtonGreen(props: BtnType) {
  const { text, handleClick, type } = props;
  return (
    <button type={type} className={css.green} onClick={handleClick}>
      {text}
    </button>
  );
}
export function ButtonGray(props: BtnType) {
  const { text, handleClick, type } = props;
  return (
    <button type={type} className={css.gray} onClick={handleClick}>
      {text}
    </button>
  );
}
