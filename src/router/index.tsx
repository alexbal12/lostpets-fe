import { Layout } from "components/layout/Layout";
import { HomePage } from "pages/home/Home";
import { LoginPage } from "pages/login/Login";
import { PasswordPage } from "pages/login/Password";
import { MyPetsPage } from "pages/my-pets/MyPets";
import { RegisterPage } from "pages/register/Register";
import { ReportEditPage } from "pages/report-edit/ReportEdit";
import { ReportPage } from "pages/report/Report";
import React from "react";
import { Route, Routes } from "react-router-dom";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/my-pets" element={<MyPetsPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/report-edit" element={<ReportEditPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/password" element={<PasswordPage />} />
      </Route>
    </Routes>
  );
}
export { AppRoutes };
