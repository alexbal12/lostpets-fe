import { Login } from "components/login";
import React, { useEffect } from "react";
import { TitleText } from "ui/texts";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const token = sessionStorage.getItem("token") || "";
  const navigate = useNavigate();
  useEffect(() => {
    if (token != "") {
      navigate("/");
    }
  }, []);
  return (
    <section>
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <TitleText text="Ingresar" />
      </div>
      <Login />
    </section>
  );
}

export { LoginPage };
