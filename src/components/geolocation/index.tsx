import React, { useEffect, useState } from "react";
import { ButtonPink } from "ui/buttons";
import { CaptionText } from "ui/texts";
import { NearbyPets } from "./NearbyPets";

export function Geoloc() {
  const [loc, setLoc] = useState("");
  useEffect(() => {
    setLoc(sessionStorage.getItem("location"));
  }, [loc]);

  function handleSubmit(e) {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(async (data) => {
      const location = JSON.stringify({
        lat: data.coords.latitude,
        long: data.coords.longitude,
      });
      sessionStorage.setItem("location", location);
      setLoc(sessionStorage.getItem("location"));
    });
  }

  return loc === null ? (
    <div>
      <div
        style={{ textAlign: "center", marginTop: "30px", marginBottom: "22px" }}
      >
        <CaptionText
          text={
            "Para ver las mascotas reportadas cerca tuyo necesitamos permiso para conocer tu ubicación."
          }
        />
      </div>
      <form onSubmit={handleSubmit}>
        <ButtonPink text={"Dar mi ubicación"} />
      </form>
    </div>
  ) : (
    <div>
      <NearbyPets />
    </div>
  );
}
