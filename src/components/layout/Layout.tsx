import { Header } from "components/header/Header";
import { Menu } from "components/menu/Menu";
import { ReportCard } from "components/report-card/ReportCard";
import { changeReportCard } from "hooks";
import React from "react";
import { Outlet } from "react-router-dom";
import css from "./index.css";

export function Layout() {
  const { reportCardState } = changeReportCard();
  return (
    <div className={`${reportCardState ? css.root : ""}`}>
      <Header />
      <main
        style={{ margin: "20px auto", maxWidth: "600px", padding: "0px 20px" }}
      >
        <ReportCard />

        <Outlet />
      </main>
      <Menu />
    </div>
  );
}
