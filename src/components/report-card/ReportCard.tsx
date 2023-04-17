import cruz from "assets/Vector.png";
import { allPets, changeReportCard, currentPet } from "hooks";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "ui/buttons";
import { InputLargeText, InputPhoneNumberText, InputText } from "ui/text-field";
import { TitleText } from "ui/texts";
import css from "./index.css";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";
import emailjs from "@emailjs/browser";

export function ReportCard() {
  const { reportCardState, setReportCardState } = changeReportCard();
  const { petsState } = allPets();
  const { currentPetState } = currentPet();
  const [pet, setPet]: any = useState();
  const [loading, setLoading] = useState(false);
  const form = useRef();
  useEffect(() => {
    setPet(petsState.find((pet) => pet.objectID == `${currentPetState}`));
  }, [currentPetState]);

  function handleClosed() {
    setReportCardState(false);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm(
        "service_61jjfec",
        "template_2bz5flh",
        form.current,
        "BqI24ULkk8eCyKVxE"
      )
      .then(
        () => {
          Swal.fire({
            icon: "success",
            text: "Se envió el mensaje correctamente!",
          });
          setLoading(false);
        },
        (error) => {
          Swal.fire({
            icon: "success",
            text: "Ocurrió un error: " + error.text,
          });
          setLoading(false);
        }
      );
    setReportCardState(false);
  }

  return (
    <div className={`${reportCardState ? css.root + " " + css.on : css.root}`}>
      <button onClick={handleClosed} className={css.button}>
        <img src={cruz} />
      </button>
      <TitleText text={pet ? "Reportar info de " + pet.name : ""} />
      <form ref={form} onSubmit={handleSubmit} className={css.form}>
        <InputText
          value=""
          name="user_name"
          label="Tu nombre"
          placeholder="Ingrese su nombre"
          readyonly={false}
        />
        <InputPhoneNumberText name="phone_number" label="Tu telefono" />
        <InputText
          value={pet ? pet.userEmail : ""}
          name="user_email"
          label="Email del dueño"
          placeholder=""
          readyonly={true}
        />
        <InputLargeText name="message" label="Donde lo viste?" />
        {loading ? (
          <span style={{ display: "flex", justifyContent: "center" }}>
            <ClipLoader color="#FF9DF5" loading size={50} />
          </span>
        ) : (
          <Button color="pink" text="Enviar" />
        )}
      </form>
    </div>
  );
}
