import { userData } from "hooks";
import { fetchDataUser, fetchUpdateUser } from "lib/api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "ui/buttons";
import { InputPasswordText, InputText } from "ui/text-field";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";

export function EditRegister() {
  const token = sessionStorage.getItem("token") || "";
  const { userDataState, setUserDataState } = userData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const userEmail = userDataState["email"];
    const userName = e.target.fullname.value;
    const password = e.target.password.value;
    const passCheck = e.target[`pass-check`].value;
    if (password == passCheck && password != "") {
      const respuesta = await fetchUpdateUser(userName, password, userEmail);
      if (respuesta[0] == 1) {
        Swal.fire({
          icon: "success",
          text: "Se cambió la contraseña correctamente",
        });
        navigate("/my-pets");
        setUserDataState(await fetchDataUser(token));
      } else {
        Swal.fire({
          icon: "error",
          text: respuesta.error,
        });
        setLoading(false);
      }
    } else {
      Swal.fire({
        icon: "error",
        text: "Las contraseñas no coinciden o los campos estan vacios, vuelva a intentarlo...",
      });
      setLoading(false);
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
        <Button color="pink" text="Ingresar" />
      )}
    </form>
  );
}
