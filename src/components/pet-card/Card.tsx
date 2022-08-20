import lapiz from "assets/lapiz.png";
import { changeReportCard, currentPet } from "hooks";
import { geoBusqueda } from "lib/api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptionText, LinkText, TitleText } from "ui/texts";
import css from "./index.css";

export function Card({ name, lat, lng, id, img, pencil, state }) {
  const { setReportCardState } = changeReportCard();
  const { setCurrentPetState } = currentPet();
  const [place, setPlace] = useState("");
  const navigate = useNavigate();

  async function handleLocation(lat, lng) {
    const resultado = await geoBusqueda(lng, lat);
    setPlace(resultado);
  }
  useEffect(() => {
    handleLocation(lat, lng);
  }, []);

  function handleLinkClick() {
    setReportCardState(true);
    setCurrentPetState(id);
  }
  function handlePencilClick() {
    navigate("/report-edit");
    setCurrentPetState(id);
  }
  return (
    <div
      className={css.root}
      style={state == "encontrado" ? { border: "10px solid #46c967" } : {}}
    >
      <div className={css.imgContainer}>
        <img className={css.img} src={img} />
      </div>
      <div className={css.infoContainer}>
        <div className={css.info}>
          <TitleText text={name} />
          <CaptionText text={place} />
        </div>
        <div className={css.linkContainer}>
          <div
            style={{ display: `${state == "encontrado" ? "none" : "initial"}` }}
          >
            <div style={{ display: `${pencil ? "none" : "initial"}` }}>
              <LinkText onClick={handleLinkClick} text="Reportar informacion" />
            </div>
          </div>
          <div
            style={{
              display: `${pencil ? "initial" : "none"}`,
              marginRight: "10px",
            }}
          >
            <img onClick={handlePencilClick} src={lapiz} />
          </div>
        </div>
      </div>
      <div
        style={{
          display: `${state == "encontrado" ? "initial" : "none"}`,
          color: "green",
          textAlign: "center",
          fontStyle: "italic",
          fontFamily: "'Poppins', sans-serif",
          margin: "15px 0",
          fontSize: "20px",
        }}
      >
        Esta mascota fue encontrada 🎉🎉🎉
      </div>
    </div>
  );
}
