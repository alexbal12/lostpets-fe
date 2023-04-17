import { currentPet, myPets, positionPet } from "hooks";
import { fecthDeletePet, fecthUpdatePet, fetchMyPets } from "lib/api";
import { Dropzone } from "lib/Dropzone";
import { Mapbox } from "lib/Mapbox";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "ui/buttons";
import { InputText } from "ui/text-field";
import { CaptionText, LinkText } from "ui/texts";
import { SpinnerLoading } from "ui/spinner";
import Swal from "sweetalert2";

export function ReportEdit() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("token");
  const { lngLat } = positionPet();
  //guarda la mascota en este hook
  const { currentPetState } = currentPet();
  //obtener todas las mascotas del usuario
  const { myPetsState, setMyPetsState } = myPets();
  //busca la mascota segun "id"
  const pet = myPetsState.find((pet) => pet.id == `${currentPetState}`);

  async function handleFound() {
    setLoading(true);
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
      Swal.fire({
        icon: "success",
        text: "Felicitaciones por encontrar tu mascota!🎉",
      });
      navigate("/my-pets");
    } else {
      Swal.fire({
        icon: "error",
        text: "Algo salió mal",
      });
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
      Swal.fire({
        icon: "info",
        text: "No cambiaste ningún dato de tu mascota",
      });
      navigate("/my-pets");
    } else {
      setLoading(true);
      const update = await fecthUpdatePet(pet.id, newDataPet, token);
      if (update[0] == 1) {
        Swal.fire({
          icon: "success",
          text: "Se actualizaron los datos",
        });
        navigate("/my-pets");
        const resultado = await fetchMyPets(token);
        setMyPetsState(resultado);
      } else {
        Swal.fire({
          icon: "error",
          text: "Algo salió mal",
        });
        navigate("/my-pets");
      }
    }
  }
  async function handleLink() {
    Swal.fire({
      title: "Estas seguro que deseas eliminar la mascota? Será permanente...",
      showCancelButton: true,
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const deletePet = fecthDeletePet(pet.id, token);
        deletePet.then((result) => {
          if (result.delete == true) {
            Swal.fire({
              icon: "success",
              text: "Se eliminó correctamente",
            });
            navigate("/my-pets");
          } else {
            Swal.fire({
              icon: "error",
              text: "Hubo un error!",
            });
          }
        });
      } else if (result.dismiss) {
        setLoading(false);
      }
    });
  }

  return !pet ? (
    <Navigate to="/" />
  ) : (
    <>
      {loading ? (
        <>
          <SpinnerLoading />
        </>
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
      )}
    </>
  );
}
