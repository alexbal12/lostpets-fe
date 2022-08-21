import { changeBurguer, userData } from "hooks";
import { fetchDataUser } from "lib/api";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinkText } from "ui/texts";
import css from "./index.css";

export function Menu() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token") || "";
  const { burguerState, setBurguerState } = changeBurguer();
  const { userDataState, setUserDataState } = userData();

  async function getUser(token: string) {
    const data = await fetchDataUser(token);
    setUserDataState(data);
  }
  useEffect(() => {
    if (token) {
      getUser(token);
    } else {
      setUserDataState([]);
    }
  }, [token]);

  function handleSubmit(e) {
    e.preventDefault();
    const name = e.nativeEvent.submitter.name;
    setBurguerState(!burguerState);

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
  function handleLinkClick() {
    sessionStorage.removeItem("token");
    navigate("/");
    setBurguerState(!burguerState);
  }
  return (
    <div
      className={`${
        burguerState ? css.background + " " + css.on : css.background
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`${burguerState ? css.root + " " + css.active : css.root}`}
      >
        <button name="mydata">Mis datos</button>
        <button name="mypets">Mis mascotas reportadas</button>
        <button name="report">Reportar mascota</button>
        <div
          style={{
            display: `${!userDataState[`email`] ? "none" : "flex"}`,
            flexDirection: "column",
            marginTop: "110px",
          }}
        >
          <span style={{ fontFamily: "Poppins, sans-serif", fontSize: "24px" }}>
            {userDataState[`email`]}
          </span>
          <LinkText onClick={handleLinkClick} text="Cerrar sesión" />
        </div>
      </form>
    </div>
  );
}
