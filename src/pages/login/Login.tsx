import { Login } from "components/login";
import React from "react";
import { TitleText } from "ui/texts";

function LoginPage() {
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
