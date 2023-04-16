import { checkEmail } from "hooks";
import { fetchCheckUser } from "lib/api";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "ui/buttons";
import { InputText } from "ui/text-field";
import ClipLoader from "react-spinners/ClipLoader";

export function Login() {
  const navigate = useNavigate();
  const { setEmailDataState } = checkEmail();
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    if (email == "") {
      alert("Campo obligatorio, ingrese un email");
    } else if (
      !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        email
      )
    ) {
      alert("Email invalido, ingrese un Email valido!");
    } else {
      setLoading(true);
      const respuesta = await fetchCheckUser(email);
      if (respuesta.message) {
        if (
          confirm(
            respuesta.message +
              '. Desea crear un usuario nuevo con el correo: "' +
              email +
              '" ?'
          )
        ) {
          setEmailDataState(email);
          navigate("/register");
        } else {
          setLoading(false);
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
        disabled={false}
      />
      {loading ? (
        <span style={{ display: "flex", justifyContent: "center" }}>
          <ClipLoader color="#FF9DF5" loading size={50} />
        </span>
      ) : (
        <Button color="pink" text="Siguiente" />
      )}
    </form>
  );
}
