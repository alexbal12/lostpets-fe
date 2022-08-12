import imgEmpty from "assets/img-vacia.png";
import { currentPet, myPets } from "hooks";
import React from "react";
import { ButtonGreen, ButtonPink } from "ui/buttons";
import { InputText } from "ui/text-field";
import { CaptionText, LinkText } from "ui/texts";
import css from "./index.css";

export function ReportEdit() {
  const { currentPetState } = currentPet();
  const { myPetsState } = myPets();
  const pet = myPetsState.find((pet) => pet.id == `${currentPetState}`);
  console.log(pet);

  function handleClick() {
    console.log("se agregó la foto");
  }
  function handleFound() {
    console.log("Encontrado");
  }
  function submitForm(e) {
    e.preventDefault();
    console.log("guardar");
  }
  function handleLink(e) {
    console.log("despublicar");
  }
  return (
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
      <div>
        <img className={css.img} src={pet.img} />
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <ButtonPink type="submit" text="Guardar" />
        <ButtonGreen
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
