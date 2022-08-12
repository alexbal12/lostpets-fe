import cruz from "assets/Vector.png";
import { allPets, changeReportCard, currentPet } from "hooks";
import { fetchReportData } from "lib/api";
import React from "react";
import { ButtonPink } from "ui/buttons";
import { InputLargeText, InputPhoneNumberText, InputText } from "ui/text-field";
import { TitleText } from "ui/texts";
import css from "./index.css";

export function ReportCard() {
  const { reportCardState, setReportCardState } = changeReportCard();
  const { petsState } = allPets();
  const { currentPetState } = currentPet();
  const findPet = petsState.find((pet) => pet.objectID == `${currentPetState}`);

  function handleClosed() {
    setReportCardState(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const fullname = e.target.fullname.value;
    const phoneNumber = e.target["phone-number"].value;
    const message = e.target.message.value;
    fetchReportData(
      findPet.userEmail,
      fullname,
      phoneNumber,
      message,
      findPet.name
    );
    setReportCardState(false);
  }

  return (
    <div className={`${reportCardState ? css.root + " " + css.on : css.root}`}>
      <button onClick={handleClosed} className={css.button}>
        <img src={cruz} />
      </button>
      <TitleText text="Reportar info de Bobby" />
      <form onSubmit={handleSubmit} className={css.form}>
        <InputText
          value=""
          name="fullname"
          label="Tu nombre"
          placeholder="Ingre su nombre"
        />
        <InputPhoneNumberText name="phone-number" label="Tu telefono" />
        <InputLargeText name="message" label="Donde lo viste?" />
        <ButtonPink text="Enviar" />
      </form>
    </div>
  );
}
