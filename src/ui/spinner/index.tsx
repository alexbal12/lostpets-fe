import React from "react";
import { ClipLoader } from "react-spinners";
function SpinnerLoading() {
  return (
    <span
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <ClipLoader color="#FF9DF5" loading size={100} />
    </span>
  );
}

export { SpinnerLoading };
