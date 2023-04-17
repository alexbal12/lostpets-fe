import imgEmpty from "assets/img-vacia.png";
import { positionPet, userData } from "hooks";
import { fecthReportPet } from "lib/api";
import { Dropzone } from "lib/Dropzone";
import { Mapbox } from "lib/Mapbox";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "ui/buttons";
import { SpinnerLoading } from "ui/spinner";
import { InputText } from "ui/text-field";
import { CaptionText } from "ui/texts";

export function Report() {
  const { lngLat } = positionPet();
  const { userDataState } = userData();
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
      toast.error('El campo "nombre de su mascota" es obligatorio');
    } else if (petImg.length < 100) {
      petImg.lenght;
      toast.error("Seleccione la imagen de su mascota");
    } else if (lngLat.length == 0) {
      toast.error("Seleccione en el mapa donde perdió su mascota");
    } else {
      setLoading(true);
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
        Swal.fire({
          icon: "success",
          text: "Se publicó correctamente tu mascota, espero que la encuentres 🙂",
        });
        navigate("/my-pets");
      }
    }
  }

  return loading ? (
    <SpinnerLoading />
  ) : (
    <form
      style={{ display: "flex", flexDirection: "column", gap: "35px" }}
      onSubmit={submitForm}
    >
      <Toaster position="top-center" reverseOrder={false} />
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
        <Button color="pink" type="submit" text="Reportar como perdido" />
        <Button
          color="gray"
          type="button"
          text="Cancelar"
          handleClick={handleCancel}
        />
      </div>
    </form>
  );
}
