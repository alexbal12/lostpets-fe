import imgEmpty from "assets/img-vacia.png";
import React from "react";
import { ButtonGray, ButtonGreen, ButtonPink } from "ui/buttons";
import { InputText } from "ui/text-field";
import { CaptionText } from "ui/texts";
import css from "./index.css";
export function Report() {
  function handleClick() {
    console.log("se agregó la foto");
  }
  function handleCancel() {
    console.log("Cancelar");
  }
  function submitForm(e) {
    e.preventDefault();
    console.log("chau");
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
      <div>
        <img className={css.img} src={imgEmpty} />
        <ButtonGreen
          type="button"
          text="agregar/modificar foto"
          handleClick={handleClick}
        />
      </div>
      <div>
        <img src={imgEmpty} className={css.img} />
        <InputText value="" label="Ubicacion" placeholder="" name="location" />
        <br />
        <CaptionText text="Buscá un punto de referencia para reportar a tu mascota. Puede ser una dirección, un barrio o una ciudad." />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <ButtonPink type="submit" text="Reportar como perdido" />
        <ButtonGray type="button" text="Cancelar" handleClick={handleCancel} />
      </div>
    </form>
  );
}
