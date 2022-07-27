import React from "react";
import { ButtonPink } from "ui/buttons";
import { CaptionText, TitleText } from "ui/texts";

function Home() {
  function handleClick() {
    navigator.geolocation.getCurrentPosition(async (data) => {
      console.log(await data);
    });
  }
  return (
    <div>
      <TitleText text={"Mascotas perdidas cerca tuyo"} />
      <div
        style={{ textAlign: "center", marginTop: "50px", marginBottom: "22px" }}
      >
        <CaptionText
          text={
            "Para ver las mascotas reportadas cerca tuyo necesitamos permiso para conocer tu ubicación."
          }
        />
      </div>

      <ButtonPink text={"Dar mi ubicación"} onClick={handleClick} />
    </div>
  );
}

export { Home };
