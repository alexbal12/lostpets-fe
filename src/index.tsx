import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { AppRoutes } from "router";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

ReactDOM.render(
  <RecoilRoot>
    <Suspense fallback={null}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Suspense>
  </RecoilRoot>,
  document.getElementById("container")
);
