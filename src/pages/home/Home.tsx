import { Geoloc } from "components/geolocation";
import React from "react";
import { TitleText } from "ui/texts";

function HomePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <TitleText text={"Mascotas perdidas cerca tuyo"} />
      <Geoloc />
    </div>
  );
}

export { HomePage };
