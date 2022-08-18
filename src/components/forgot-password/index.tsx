import { fetchCheckUser, fetchUpdateUser } from "lib/api";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ButtonPink } from "ui/buttons";
import { InputPasswordText, InputText } from "ui/text-field";

export function ForgotPassword() {
  const navigate = useNavigate();
  async function userName(email) {
    const respuesta = await fetchCheckUser(email);
    return respuesta.fullname;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const user = await userName(email);

    if (e.target.password.value == e.target["pass-check"].value) {
      const password = e.target.password.value;
      const respuesta = await fetchUpdateUser(user, password, email);
      if (respuesta[0] == 1) {
        console.log(respuesta);
        alert("Se cambió la contraseña correctamente");
        navigate("/login");
      } else {
        console.log(respuesta);

        alert("Ocurrió un error inesperado");
      }
    } else {
      alert("No coinciden las contraseñas, intentelo nuevamente");
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "70px" }}
    >
      <div>
        <InputText
          value=""
          name="email"
          label="Email"
          placeholder="Ingrese su email"
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <InputPasswordText name="password" label="Contraseña" />
        <InputPasswordText name="pass-check" label="Repetir contraseña" />
      </div>
      <ButtonPink text="Restablecer contraseña" />
    </form>
  );
}
