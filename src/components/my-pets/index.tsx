import { Card } from "components/pet-card/Card";
import { myPets } from "hooks";
import { fetchMyPets } from "lib/api";
import React, { useEffect } from "react";
import { CaptionText } from "ui/texts";

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
  }, [myPetsState]);

  return myPetsState.length == 0 ? (
    <div>
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
          lat={pet.last_lat}
          lng={pet.last_lng}
          img={pet.img}
          state={pet.state}
        />
      ))}
    </div>
  );
}
