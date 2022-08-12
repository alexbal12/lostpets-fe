import { userData } from "hooks";
import { fetchDataUser } from "lib/api";
import React, { useEffect } from "react";
import { ButtonPink } from "ui/buttons";
import { InputPasswordText, InputText } from "ui/text-field";

export function Register() {
  const token = sessionStorage.getItem("token") || "";
  const { userDataState, setUserDataState } = userData();
  async function getUser(token: string) {
    setUserDataState(await fetchDataUser(token));
  }
  useEffect(() => {
    if (token) {
      getUser(token);
    }
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    console.log("hicieron click");
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
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <InputPasswordText name="password" label="Contraseña" />
        <InputPasswordText name="pass-check" label="Repetir contraseña" />
      </div>
      <ButtonPink text="Guardar" />
    </form>
  );
}
