import React, { useEffect, useState } from "react";

import { Route, Routes } from "react-router-dom";
import "./RouterView.scss";
import { loginPageSubject } from "../../events/LoginPageEvent";
import ProtectedRouteApp from "../ProtectedRouteApp";
import LandingPage from "../Page/LandingPage";
import UnauthorizedPage from "../Page/UnauthorizedPage";
import EditCompany from "../Page/SettingsPage/EditCompany";
import Permissions from "../Page/SettingsPage/Permissions";
import BackupAndRestore from "../Page/SettingsPage/BackupAndRestore";
import LoginPage from "../Page/LoginPage";
import BrowsePage from "../Page/BrowsePage";

interface Props {}

const RouterView = (props: Props) => {
  const [loginPage, setLoginPage] = useState(true);

  useEffect(() => {
    loginPageSubject.subscribe((message) => {
      setLoginPage(message.state);
    });
  }, []);

  return (
    <div
      className={`router-view ${
        loginPage ? "on-login-page" : "not-on-login-page"
      }`}
    >
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRouteApp
              middleware={["authenticate"]}
              component={LandingPage}
            />
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRouteApp
              middleware={["authenticate"]}
              component={LandingPage}
            />
          }
        />
        <Route
          path="/login"
          element={<ProtectedRouteApp middleware={[]} component={LoginPage} />}
        />
        <Route
          path="/confirm-email"
          element={
            <ProtectedRouteApp
              middleware={[]}
              component={LoginPage}
              additionalProps={{ view: "confirmemail" }}
            />
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRouteApp
              middleware={[]}
              component={LoginPage}
              additionalProps={{ view: "resetpassword" }}
            />
          }
        />
        <Route
          path="/:space/browse"
          element={
            <ProtectedRouteApp
              middleware={["authenticate"]}
              component={BrowsePage}
            />
          }
        />
        <Route
          path="/:space/unauthorized"
          element={
            <ProtectedRouteApp
              middleware={["isAuthenticated"]}
              component={UnauthorizedPage}
            />
          }
        />
        <Route
          path="/:space/settings/company"
          element={
            <ProtectedRouteApp
              middleware={["authenticate"]}
              component={EditCompany}
            />
          }
        />
        <Route
          path="/:space/settings/user"
          element={
            <ProtectedRouteApp
              middleware={["authenticate"]}
              component={Permissions}
            />
          }
        />
        <Route
          path="/:space/settings/backup"
          element={
            <ProtectedRouteApp
              middleware={["authenticate"]}
              component={BackupAndRestore}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default RouterView;
