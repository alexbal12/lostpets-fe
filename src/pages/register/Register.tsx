import { Register } from "components/register";
import React from "react";
import { TitleText } from "ui/texts";

function RegisterPage() {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "45px" }}>
      <TitleText text="Mis datos" />
      <Register />
    </section>
  );
}

export { RegisterPage };
