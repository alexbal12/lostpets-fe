import { currentPet, myPets, positionPet } from "hooks";
import { fecthDeletePet, fecthUpdatePet } from "lib/api";
import { Dropzone } from "lib/Dropzone";
import { Mapbox } from "lib/Mapbox";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "ui/buttons";
import { InputText } from "ui/text-field";
import { CaptionText, LinkText } from "ui/texts";

export function ReportEdit() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const { lngLat } = positionPet();
  //guarda la mascota en este hook
  const { currentPetState } = currentPet();
  //obtener todas las mascotas del usuario
  const { myPetsState } = myPets();
  //busca la mascota segun "id"
  const pet = myPetsState.find((pet) => pet.id == `${currentPetState}`);

  async function handleFound() {
    const newDataPet = {
      name: pet.name,
      img: pet.img,
      last_lat: pet.last_lat,
      last_lng: pet.last_lng,
      state: "encontrado",
      userEmail: pet.user.email,
    };
    const update = await fecthUpdatePet(pet.id, newDataPet, token);
    if (update[0] == 1) {
      alert("Felicitaciones por encontrar tu mascota!🎉");
      navigate("/my-pets");
    } else {
      alert("Algo salió mal");
      navigate("/my-pets");
    }
  }
  async function submitForm(e) {
    e.preventDefault();
    const newDataPet = {
      name: pet.name,
      img: pet.img,
      last_lat: pet.last_lat,
      last_lng: pet.last_lng,
      state: pet.state,
      userEmail: pet.user.email,
    };
    let change = false;
    const currentPetName = e.target["pet-name"].value;
    const currentPetImg = e.target.petImg.src;
    const currentPetLat = lngLat["lat"];
    const currentPetLng = lngLat["lng"];
    if (currentPetName != pet.name) {
      newDataPet.name = currentPetName;
      change = true;
    }
    if (currentPetImg != pet.img) {
      newDataPet.img = currentPetImg;
      change = true;
    }
    if (
      (currentPetLat != pet.last_lat && currentPetLat) ||
      (currentPetLng != pet.last_lng && currentPetLng)
    ) {
      newDataPet.last_lat = currentPetLat;
      newDataPet.last_lng = currentPetLng;
      change = true;
    }
    if (pet.state == "encontrado") {
      newDataPet.state = "perdido";
      change = true;
    }
    if (change == false) {
      alert("Nada cambió");
      navigate("/my-pets");
    } else {
      const update = await fecthUpdatePet(pet.id, newDataPet, token);
      if (update[0] == 1) {
        alert("Se actualizaron los datos");
        navigate("/my-pets");
      } else {
        alert("Algo salió mal");
        navigate("/my-pets");
      }
    }
  }
  async function handleLink() {
    if (
      confirm("Estas seguro que deseas eliminar la mascota? Será permanente")
    ) {
      const deletePet = await fecthDeletePet(pet.id, token);
      if (deletePet.delete == true) {
        alert("Se eliminó correctamente");
        navigate("/my-pets");
      } else {
        alert("Hubo un error");
        navigate("/my-pets");
      }
    }
  }

  return !pet ? (
    <Navigate to="/" />
  ) : (
    <form
      style={{ display: "flex", flexDirection: "column", gap: "35px" }}
      onSubmit={submitForm}
    >
      <InputText
        value={pet.name}
        label="Nombre"
        placeholder="Ingrese el nombre de su mascota"
        name="pet-name"
      />
      <Dropzone idImg="petImg" src={pet.img} />
      <div>
        <Mapbox lat={pet.last_lat} lng={pet.last_lng} />
        <CaptionText text="Arrastré el marcador celeste para indicar en que zona perdió su mascota" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Button color="pink" type="submit" text="Guardar" />
        <Button
          color="green"
          type="button"
          text="Reportar como encontrado"
          handleClick={handleFound}
        />
        <br />
        <LinkText text="despublicar" onClick={handleLink} />
      </div>
    </form>
  );
}
