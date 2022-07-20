import { Home } from "pages/home/Home";
import { MyPets } from "pages/my-pets/MyPets";
import { Register } from "pages/register/Register";
import { Report } from "pages/report/Report";
import { ReportEdit } from "pages/report-edit/ReportEdit";
import { Signin } from "pages/signin/Signin";
import { Layout } from "components/layout/Layout";
import React from "react";
import { Routes, Route } from "react-router-dom";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/my-pets" element={<MyPets />} />
        <Route path="/register" element={<Register />} />
        <Route path="/report" element={<Report />} />
        <Route path="/report-edit" element={<ReportEdit />} />
        <Route path="/signin" element={<Signin />} />
      </Route>
    </Routes>
  );
}
export { AppRoutes };
