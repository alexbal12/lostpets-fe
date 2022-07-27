import React from "react";
import { useNavigate } from "react-router-dom";
import { MenuBar } from "components/menu/MenuBar";
import { BurgerButton } from "ui/burger";
import { changeBurguer } from "hooks";
import patitas from "assets/patitas.png";
import css from "./index.css";

function Header() {
  const { burguerState, setBurguerState } = changeBurguer();
  const navigate = useNavigate();
  function handleClick() {
    navigate("/");
    if (burguerState === true) {
      setBurguerState(!burguerState);
    }
  }
  return (
    <nav className={css.root}>
      <img onClick={handleClick} className={css.img} src={patitas} />
      <MenuBar />
      <BurgerButton />
    </nav>
  );
}

export { Header };
