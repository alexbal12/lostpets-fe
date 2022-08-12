import { Card } from "components/pet-card/Card";
import { allPets } from "hooks";
import { fetchNearbyPets } from "lib/api";
import React, { useEffect } from "react";

export function NearbyPets() {
  const location = JSON.parse(sessionStorage.getItem("location"));
  const { petsState, setPetsState } = allPets();

  const getPets = async (loc) => {
    const data = await fetchNearbyPets(loc.lat, loc.long);
    setPetsState(data);
  };
  useEffect(() => {
    if (location) {
      getPets(location);
    }
  }, []);

  return (
    <div>
      {petsState ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          {petsState.map((pet) => (
            <Card
              pencil={false}
              key={pet.objectID}
              id={pet.objectID}
              name={pet.name}
              ubicacion={pet._geoloc.lat + " " + pet._geoloc.lng}
              img={pet.img}
            />
          ))}
        </div>
      ) : (
        <div>"No hay mascotas"</div>
      )}
    </div>
  );
}
