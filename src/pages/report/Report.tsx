import { Report } from "components/publish-report";
import React from "react";
import { TitleText } from "ui/texts";

function ReportPage() {
  return (
    <section>
      <div style={{ marginBottom: "30px" }}>
        <TitleText text={"Reportar mascota perdida"} />
      </div>
      <Report />
    </section>
  );
}

export { ReportPage };
