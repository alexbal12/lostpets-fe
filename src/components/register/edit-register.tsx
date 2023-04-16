import { userData } from "hooks";
import { fetchDataUser, fetchUpdateUser } from "lib/api";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "ui/buttons";
import { InputPasswordText, InputText } from "ui/text-field";

export function EditRegister() {
  const token = sessionStorage.getItem("token") || "";
  const { userDataState, setUserDataState } = userData();
  const navigate = useNavigate();
  async function getUser(token: string) {
    setUserDataState(await fetchDataUser(token));
  }
  useEffect(() => {
    if (token) {
      getUser(token);
    }
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    const userEmail = userDataState["email"];
    const userName = e.target.fullname.value;
    const password = e.target.password.value;
    const passCheck = e.target[`pass-check`].value;
    if (password == passCheck && password != "") {
      const respuesta = await fetchUpdateUser(userName, password, userEmail);
      if (respuesta[0] == 1) {
        alert("Se cambió la contraseña correctamente");
        navigate("/my-pets");
        setUserDataState(await fetchDataUser(token));
      } else {
        alert(respuesta.error);
      }
    } else {
      alert(
        "Las contraseñas no coinciden o los campos estan vacios, vuelva a intentarlo"
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "70px" }}
    >
      <div>
        <InputText
          value={userDataState["fullname"]}
          name="fullname"
          label="Nombre"
          placeholder="Ingrese su nombre"
          disabled={false}
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
