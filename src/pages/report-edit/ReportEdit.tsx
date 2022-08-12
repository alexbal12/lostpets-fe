import { ReportEdit } from "components/report-edit";
import React from "react";
import { TitleText } from "ui/texts";

function ReportEditPage() {
  return (
    <section>
      <div style={{ marginBottom: "30px" }}>
        <TitleText text={"Editar mascota perdida"} />
      </div>
      <ReportEdit />
    </section>
  );
}

export { ReportEditPage };
