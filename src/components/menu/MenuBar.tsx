import React from "react";
import { useNavigate } from "react-router-dom";
import css from "./index.css";

function MenuBar() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token") || "";
  function handleSubmit(e) {
    e.preventDefault();
    const name = e.nativeEvent.submitter.name;
    if (token == "") {
      navigate("/login");
    } else if (name == "mydata") {
      navigate("/register");
    } else if (name == "mypets") {
      navigate("/my-pets");
    } else if (name == "report") {
      navigate("/report");
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className={css.menuBar}>
        <button name="mydata">Mis datos</button>
        <button name="mypets">Mis mascotas reportadas</button>
        <button name="report">Reportar mascota</button>
      </form>
    </div>
  );
}

export { MenuBar };
