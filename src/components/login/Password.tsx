import { checkEmail } from "hooks";
import { fetchAuthToken } from "lib/api";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "ui/buttons";
import { InputPasswordText } from "ui/text-field";
import { LinkText } from "ui/texts";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";

export function Password() {
  const navigate = useNavigate();
  const { emailDataState } = checkEmail();
  const email = emailDataState[`email`];
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (emailDataState.length == 0) {
      navigate("/login");
    } else {
      const { token } = await fetchAuthToken(email, e.target.password.value);
      if (!token) {
        Swal.fire({
          icon: "error",
          text: "Contraseña incorrecta! Vuelva a intentarlo",
        });
        setLoading(false);
      } else {
        toast.success("Inicio de sesión exitoso!");
        sessionStorage.setItem("token", token);
        navigate("/my-pets");
      }
    }
  }
  function handleForgotPassword() {
    navigate("/forgot-password");
  }
  return (
    <form onSubmit={handleSubmit}>
      <Toaster position="top-center" reverseOrder={false} />
      <InputPasswordText name="password" label="Contraseña" />
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <LinkText text="olvidé mi contraseña" onClick={handleForgotPassword} />
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
