import { Card } from "components/pet-card/Card";
import { myPets } from "hooks";
import { fetchMyPets } from "lib/api";
import React, { useEffect } from "react";
import { CaptionText } from "ui/texts";
import css from "./index.css";

export function MyPets() {
  const { myPetsState, setMyPetsState } = myPets();
  const token = sessionStorage.getItem("token") || "";

  async function getMyPets(token: string) {
    const resultado = await fetchMyPets(token);
    setMyPetsState(resultado);
  }
  useEffect(() => {
    if (token) {
      getMyPets(token);
    }
  }, []);

  return myPetsState.length == 0 ? (
    <div className={css.root}>
      <CaptionText text="Aun no reportaste mascotas perdidas" />
    </div>
  ) : (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      {myPetsState.map((pet) => (
        <Card
          pencil={true}
          key={pet.id}
          id={pet.id}
          name={pet.name}
          ubicacion={pet.last_lat + " " + pet.last_lng}
          img={pet.img}
        />
      ))}
    </div>
  );
}
