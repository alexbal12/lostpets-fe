import imgEmpty from "assets/img-vacia.png";
import { positionPet, userData } from "hooks";
import { fecthReportPet } from "lib/api";
import { Dropzone } from "lib/Dropzone";
import { Mapbox } from "lib/Mapbox";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ButtonGray, ButtonPink } from "ui/buttons";
import { InputText } from "ui/text-field";
import { CaptionText } from "ui/texts";
export function Report() {
  const { lngLat } = positionPet();
  const { userDataState } = userData();
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  function handleCancel() {
    navigate("/my-pets");
  }
  async function submitForm(e) {
    e.preventDefault();
    const petName = e.target["pet-name"].value;
    const petImg = e.target.petImg.src;
    const state = "perdido";
    const userEmail = userDataState["email"];
    if (petName == "") {
      alert("Ingrese el nombre de su mascota");
    } else if (petImg.length < 100) {
      petImg.lenght;
      alert("Seleccione la imagen de su mascota");
    } else if (lngLat.length == 0) {
      alert("Seleccione en el mapa donde perdió su mascota");
    } else {
      const pet = {
        name: petName,
        img: petImg,
        last_lat: lngLat["lat"],
        last_lng: lngLat["lng"],
        state: state,
        userEmail: userEmail,
      };
      const respuesta = await fecthReportPet(pet, token);
      if (respuesta) {
        alert(
          "Se publicó correctamente tu mascota, espero que la encuentres 🙂"
        );
        navigate("/my-pets");
      }
    }
  }

  return (
    <form
      style={{ display: "flex", flexDirection: "column", gap: "35px" }}
      onSubmit={submitForm}
    >
      <InputText
        value=""
        label="Nombre"
        placeholder="Ingrese el nombre de su mascota"
        name="pet-name"
      />
      <Dropzone idImg="petImg" src={imgEmpty} />
      <div>
        <Mapbox lat={-31.41562879947604} lng={-64.18399037355995} />
        <CaptionText text="Arrastré el marcador celeste para indicar en que zona perdió su mascota" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <ButtonPink type="submit" text="Reportar como perdido" />
        <ButtonGray type="button" text="Cancelar" handleClick={handleCancel} />
      </div>
    </form>
  );
}
