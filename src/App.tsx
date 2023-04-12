import React, { useContext } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthPage } from "./modules/AuthPage";
import { SignUpPage } from "./modules/SignUpPage";
import { AuthContext } from "./components/AuthContext";
import { PhoneAuthPage } from "./modules/PhoneAuthPage/PhoneAuthPage";
import { HomePage } from "./modules/HomePage";
import { Loader } from "./components/Loader";
import { AuthLayout } from "./components/AuthLayout";
import { AppLayout } from "./components/AppLayout";
import { UserProfilePage } from "./modules/UserProfilePage";
import { PageNotFound } from "./modules/PageNotFound";
import { MessagesPage } from "./modules/MessagesPage";
import { PaymentsPage } from "./modules/PaymentsPage";
import { SettingsPage } from "./modules/SettingsPage";
import { ReportsPage } from "./modules/ReportsPage";
import { SupportPage } from "./modules/SupportPage";
import { UsersPage } from "./modules/UsersPage";
import { TripsPage } from "./modules/TripsPage";

export const App: React.FC = () => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Routes>
        <Route path="*" element={<PageNotFound />} />

        <Route
          path="/"
          element={
            user ? (
              <Navigate to="home" />
            ) : (
              <AuthLayout>
                <AuthPage />
              </AuthLayout>
            )
          }
        />

        <Route
          path="signup"
          element={
            <AuthLayout>
              <SignUpPage />
            </AuthLayout>
          }
        />

        <Route
          path="phonelogin"
          element={
            <AuthLayout>
              <PhoneAuthPage />
            </AuthLayout>
          }
        />

        <Route
          path="home"
          element={
            user ? (
              <AppLayout>
                <HomePage />
              </AppLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="profile"
          element={
            <AppLayout>
              <UserProfilePage />
            </AppLayout>
          }
        />

        <Route
          path="messages"
          element={
            <AppLayout>
              <MessagesPage />
            </AppLayout>
          }
        />

        <Route
          path="payments"
          element={
            <AppLayout>
              <PaymentsPage />
            </AppLayout>
          }
        />

        <Route
          path="settings"
          element={
            <AppLayout>
              <SettingsPage />
            </AppLayout>
          }
        />

        <Route
          path="reports"
          element={
            <AppLayout>
              <ReportsPage />
            </AppLayout>
          }
        />

        <Route
          path="support"
          element={
            <AppLayout>
              <SupportPage />
            </AppLayout>
          }
        />

        <Route
          path="users"
          element={
            <AppLayout>
              <UsersPage />
            </AppLayout>
          }
        />

        <Route
          path="trips"
          element={
            <AppLayout>
              <TripsPage />
            </AppLayout>
          }
        />
      </Routes>
    </>
  );
};
