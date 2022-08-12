import { MyPets } from "components/my-pets";
import React from "react";
import { TitleText } from "ui/texts";

function MyPetsPage() {
  return (
    <div>
      <div style={{ marginBottom: "30px" }}>
        <TitleText text={"Mis mascotas reportadas"} />
      </div>
      <MyPets />
    </div>
  );
}

export { MyPetsPage };
