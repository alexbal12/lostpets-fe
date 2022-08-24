import { loadingButton } from "hooks";
import { fecthCreateUser, fetchCheckUser, fetchUpdateUser } from "lib/api";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "ui/buttons";
import { InputPasswordText, InputText } from "ui/text-field";

export function Register() {
  const { setLoadButton } = loadingButton();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const emailInput = e.target.email.value;
    const userName = e.target.fullname.value;
    const password = e.target.password.value;
    const passCheck = e.target[`pass-check`].value;
    if (userName == "") {
      alert("Debe ingresar un nombre");
      setLoadButton(false);
    } else if (
      !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        emailInput
      )
    ) {
      alert("Debe ingresar un email valido");
      setLoadButton(false);
    } else if (password != passCheck || password == "") {
      alert("Las contraseñas no coinciden o los campos estan vacios");
      setLoadButton(false);
    } else {
      const respuesta = await fetchCheckUser(emailInput);
      if (!respuesta.message) {
        if (confirm("El email ya existe, desea actualizar la contraseña?")) {
          const respuesta = await fetchUpdateUser(
            userName,
            password,
            emailInput
          );
          if (respuesta[0] == 1) {
            console.log(respuesta);
            alert("Se cambió la contraseña correctamente");
            navigate("/login");
          } else {
            alert(respuesta.error);
            setLoadButton(false);
          }
        } else {
          setLoadButton(false);
        }
      } else {
        console.log("el mail no existe");
        const respuesta = await fecthCreateUser(userName, emailInput, password);
        console.log(respuesta);
        if (respuesta) {
          alert("Se creo el usuario correctamente!");
          navigate("/login");
        } else {
          alert("Ocurrió un error, vuelva a intentarlo");
          setLoadButton(false);
        }
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "70px" }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <InputText
          value=""
          name="fullname"
          label="Nombre"
          placeholder="Ingrese su nombre"
        />
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
      <Button color="pink" text="Guardar" />
    </form>
  );
}
