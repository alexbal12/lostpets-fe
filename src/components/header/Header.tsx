import patitas from "assets/patitas.png";
import { MenuBar } from "components/menu/MenuBar";
import { changeBurguer, changeReportCard } from "hooks";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BurgerButton } from "ui/burger";
import css from "./index.css";

function Header() {
  const { burguerState, setBurguerState } = changeBurguer();
  const { reportCardState } = changeReportCard();

  const navigate = useNavigate();
  function handleClick() {
    navigate("/");
    if (burguerState === true) {
      setBurguerState(!burguerState);
    }
  }
  return (
    <nav
      style={{ pointerEvents: `${reportCardState ? "none" : "auto"}` }}
      className={css.root}
    >
      <img onClick={handleClick} className={css.img} src={patitas} />
      <MenuBar />
      <BurgerButton />
    </nav>
  );
}

export { Header };
