import { Card } from "components/pet-card/Card";
import { allPets } from "hooks";
import { fetchNearbyPets } from "lib/api";
import React, { useEffect } from "react";
import { CaptionText } from "ui/texts";

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
      {petsState.length != 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          {petsState.map((pet) => (
            <Card
              pencil={false}
              key={pet.objectID}
              id={pet.objectID}
              name={pet.name}
              lat={pet._geoloc.lat}
              lng={pet._geoloc.lng}
              img={pet.img}
              state={pet.state}
            />
          ))}
        </div>
      ) : (
        <div>
          <CaptionText text="Por suerte no hay mascotas perdidas cerca de tu zona" />
        </div>
      )}
    </div>
  );
}
