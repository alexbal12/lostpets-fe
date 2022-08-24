import { checkEmail, loadingButton } from "hooks";
import { fetchCheckUser } from "lib/api";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "ui/buttons";
import { InputText } from "ui/text-field";

export function Login() {
  const navigate = useNavigate();
  const { setEmailDataState } = checkEmail();
  const { setLoadButton } = loadingButton();
  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    if (email == "") {
      alert("Campo obligatorio, ingrese un email");
      setLoadButton(false);
    } else if (
      !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        email
      )
    ) {
      alert("Email invalido, ingrese un Email valido!");
      setLoadButton(false);
    } else {
      const respuesta = await fetchCheckUser(email);
      if (respuesta.message) {
        if (confirm(respuesta.message + ". Desea crear un usuario nuevo?")) {
          navigate("/register");
          setLoadButton(false);
        } else {
          console.log("no acepto");
          setLoadButton(false);
        }
      } else {
        setEmailDataState(respuesta);
        navigate("/password");
      }
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
      <Button color="pink" text="Siguiente" />
    </form>
  );
}
