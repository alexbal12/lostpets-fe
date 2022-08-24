import user from "assets/user.png";
import { userData } from "hooks";
import { fetchDataUser } from "lib/api";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LinkText } from "ui/texts";
import css from "./index.css";

function MenuBar() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token") || "";
  const { userDataState, setUserDataState } = userData();
  const [cardUser, setUserCard] = useState(false);

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
    if (token == "") {
      navigate("/login");
    } else if (name == "mydata") {
      navigate("/edit-register");
    } else if (name == "mypets") {
      navigate("/my-pets");
    } else if (name == "report") {
      navigate("/report");
    }
  }
  function handleClick() {
    setUserCard(!cardUser);
  }
  function handleLinkClick() {
    sessionStorage.removeItem("token");
    navigate("/");
    setUserCard(!cardUser);
  }

  return (
    <div>
      <form
        style={{
          alignItems: "center",
        }}
        onSubmit={handleSubmit}
        className={css.menuBar}
      >
        <button name="mydata">Mis datos</button>
        <button name="mypets">Mis mascotas reportadas</button>
        <button name="report">Reportar mascota</button>

        <Link
          style={{ display: `${!userDataState[`email`] ? "flex" : "none"}` }}
          to="/login"
        >
          <img className={css.imgUser} src={user} />
        </Link>

        <img
          onClick={handleClick}
          style={{
            display: `${!userDataState[`email`] ? "none" : "flex"}`,
          }}
          className={css.imgUser}
          src={user}
        />
        <div
          className={cardUser ? css.userCard + " " + css.visible : css.userCard}
          style={{
            display: `${!userDataState[`email`] ? "none" : "flex"}`,
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

export { MenuBar };
