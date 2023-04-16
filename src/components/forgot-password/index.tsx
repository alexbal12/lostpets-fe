import { checkEmail } from "hooks";
import { fetchCheckUser, fetchUpdateUser } from "lib/api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "ui/buttons";
import { InputPasswordText, InputText } from "ui/text-field";
import ClipLoader from "react-spinners/ClipLoader";

export function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { emailDataState }: any = checkEmail();
  useEffect(() => {
    if (emailDataState.length == 0) {
      navigate("/login");
    }
  });
  async function userName(email) {
    const respuesta = await fetchCheckUser(email);
    return respuesta.fullname;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    if (e.target.password.value == e.target["pass-check"].value) {
      setLoading(true);
      const user = await userName(email);
      const password = e.target.password.value;
      const respuesta = await fetchUpdateUser(user, password, email);
      if (respuesta[0] == 1) {
        alert("Se cambió la contraseña correctamente");
        navigate("/login");
      } else {
        navigate("/login");
        alert(respuesta.error);
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
          value={emailDataState.email}
          name="email"
          label="Email"
          placeholder="Ingrese su email"
          disabled={true}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <InputPasswordText name="password" label="Contraseña" />
        <InputPasswordText name="pass-check" label="Repetir contraseña" />
      </div>
      {loading ? (
        <span style={{ display: "flex", justifyContent: "center" }}>
          <ClipLoader color="#FF9DF5" loading size={50} />
        </span>
      ) : (
        <Button color="pink" text="Restablecer contraseña" />
      )}
    </form>
  );
}
