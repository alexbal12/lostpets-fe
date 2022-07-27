import { Header } from "components/header/Header";
import { Menu } from "components/menu/Menu";
import React from "react";
import { Outlet } from "react-router-dom";
import css from "./index.css";

export function Layout() {
  return (
    <div className={css.root}>
      <Header />
      <div
        style={{ margin: "20px auto", maxWidth: "700px", padding: "0px 20px" }}
      >
        <Outlet />
      </div>
      <Menu />
    </div>
  );
}
