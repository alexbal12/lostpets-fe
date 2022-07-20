import React from "react";
import css from "./index.css";
import { changeBurguer } from "hooks";

function BurgerButton() {
  const { burguerState, setBurguerState } = changeBurguer();
  function handleClick() {
    setBurguerState(!burguerState);
  }
  return (
    <div
      onClick={handleClick}
      className={`${burguerState ? css.root + " " + css.open : css.root}`}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

export { BurgerButton };
