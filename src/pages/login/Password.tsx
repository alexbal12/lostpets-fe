import { Password } from "components/login/Password";
import React from "react";
import { TitleText } from "ui/texts";

function PasswordPage() {
  return (
    <section>
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <TitleText text="Ingresar" />
      </div>
      <Password />
    </section>
  );
}

export { PasswordPage };
