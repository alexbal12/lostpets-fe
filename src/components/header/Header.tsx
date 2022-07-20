import React from "react";
import patitas from "assets/patitas.png";
import { BurgerButton } from "ui/burger";
import { MenuBar } from "components/menu/MenuBar";
import css from "./index.css";

function Header() {
  return (
    <nav className={css.root}>
      <img className={css.img} src={patitas} />
      <MenuBar />
      <BurgerButton />
    </nav>
  );
}

export { Header };
