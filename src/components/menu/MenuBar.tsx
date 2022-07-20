import React from "react";

import css from "./index.css";

function MenuBar() {
  return (
    <div>
      <ul className={css.menuBar}>
        <a href="#">Mis datos</a>
        <a href="#">Mis mascotas reportadas</a>
        <a href="#">Reportar mascota</a>
      </ul>
    </div>
  );
}

export { MenuBar };
