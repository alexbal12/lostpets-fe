import { checkEmail } from "hooks";
import { fetchCheckUser } from "lib/api";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ButtonPink } from "ui/buttons";
import { InputText } from "ui/text-field";

export function Login() {
  const navigate = useNavigate();
  const { setEmailDataState } = checkEmail();
  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const respuesta = await fetchCheckUser(email);
    if (respuesta.message) {
      console.log(respuesta.message);
    } else {
      setEmailDataState(respuesta);
      navigate("/password");
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "25px" }}
    >
      <InputText
        value=""
        name="email"
        label="Email"
        placeholder="Ingrese su email"
      />
      <ButtonPink text="Siguiente" />
    </form>
  );
}
