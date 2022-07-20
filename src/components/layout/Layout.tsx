import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "components/header/Header";
import { Menu } from "components/menu/Menu";
export function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Menu />
    </div>
  );
}
