import React from "react";
import { Link } from "react-router-dom";
export function NotFound() {
  return (
    <div>
      {" "}
      <p style={{ textAlign: "center", fontSize: "24px" }}>
        Pagina No Encontrada
      </p>
      <p style={{ textAlign: "center" }}>
        <Link to="/">Ir al Home </Link>
      </p>
    </div>
  );
}
