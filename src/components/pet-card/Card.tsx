import lapiz from "assets/lapiz.png";
import { changeReportCard, currentPet } from "hooks";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CaptionText, LinkText, TitleText } from "ui/texts";
import css from "./index.css";

export function Card({ name, ubicacion, id, img, pencil }) {
  const { setReportCardState } = changeReportCard();
  const { setCurrentPetState } = currentPet();
  const navigate = useNavigate();
  function handleLinkClick() {
    setReportCardState(true);
    setCurrentPetState(id);
  }
  function handlePencilClick() {
    navigate("/report-edit");
    setCurrentPetState(id);
  }
  return (
    <div className={css.root}>
      <div className={css.imgContainer}>
        <img className={css.img} src={img} />
      </div>
      <div className={css.infoContainer}>
        <div className={css.info}>
          <TitleText text={name} />
          <CaptionText text={ubicacion} />
        </div>
        <div className={css.linkContainer}>
          <div style={{ display: `${pencil ? "none" : "initial"}` }}>
            <LinkText onClick={handleLinkClick} text="Reportar informacion" />
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
    </div>
  );
}
