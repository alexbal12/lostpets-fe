import { EditRegister } from "components/register/edit-register";
import React from "react";
import { TitleText } from "ui/texts";

function EditRegisterPage() {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "45px" }}>
      <TitleText text="Mis datos" />
      <EditRegister />
    </section>
  );
}

export { EditRegisterPage };
