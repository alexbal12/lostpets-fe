import React from "react";
import css from "./index.css";
import { changeBurguer } from "hooks";

export function Menu() {
  const { burguerState, setBurguerState } = changeBurguer();
  function handleClick() {
    setBurguerState(!burguerState);
  }
  return (
    <div
      className={`${
        burguerState ? css.background + " " + css.on : css.background
      }`}
    >
      <ul
        className={`${burguerState ? css.root + " " + css.active : css.root}`}
      >
        <a onClick={handleClick} href="#">
          Mis datos
        </a>
        <a onClick={handleClick} href="#">
          Mis mascotas reportadas
        </a>
        <a onClick={handleClick} href="#">
          Reportar mascota
        </a>
      </ul>
    </div>
  );
}
