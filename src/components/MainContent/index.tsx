import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./style.scss";

import BodyContainer from "../App/BodyContainer";
import { useLocation, useNavigate } from "react-router-dom";
import { AppShellReveal } from "basicui";

import logoIconWhite from "../../images/echo_white_small.svg";
import logoTextWhite from "../../images/echo_white_text.svg";
import logoIconBlack from "../../images/echo_black_small.svg";
import logoTextBlack from "../../images/echo_black_text.svg";
import SideNavLink from "./SideNavLink";
import {
  faBook,
  faCircleNodes,
  faCogs,
  faDatabase,
  faFolderOpen,
  faListUl,
  faPalette,
  faPlus,
  faPuzzlePiece,
  faSearch,
  faStrikethrough,
  faTh,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import SideNavSubHeading from "./SideNavSubHeading";
import { setProfile } from "../../store/actions/ProfileActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeSessionValue } from "../../utils/SessionUtils";
import { removeAuth } from "../../store/actions/AuthActions";
import MobileSidebar from "../MobileSidebar";

interface Props {
  space: string;
}

const MainContent = (props: Props) => {
  const navigate = useNavigate();
  const profile = useSelector((state: any) => state.profile);
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();
  const location = useLocation();

  const toggleMode = () => {
    dispatch(
      setProfile({
        theme:
          profile.theme === "basicui-dark" ? "basicui-light" : "basicui-dark",
      })
    );

    sessionStorage.setItem(
      "fortuna_pref_profile_colormode",
      profile.theme === "basicui-dark" ? "basicui-light" : "basicui-dark"
    );
  };

  const chooseCompany = () => {
    navigate("/home");
  };

  const toggleSidebar = () => {
    sessionStorage.setItem(
      "echo_pref_sidebar_status",
      profile.sidebar ? "collapsed" : "expanded"
    );

    dispatch(setProfile({ ...profile, sidebar: !profile.sidebar }));
  };

  const logout = () => {
    dispatch(removeAuth());
    removeSessionValue(`echo-access_token`);
    removeSessionValue(`echo-refresh_token`);
    navigate(`/`);
  };

  const login = (type: string) => {
    navigate("/login");
  };

  return (
    <AppShellReveal
      isDarkMode={profile.theme === "basicui-dark"}
      isMenuActive={profile.sidebar}
      setIsMenuActive={toggleSidebar}
      onSignin={login}
      onSignout={logout}
      userName={authorization.isAuth ? `${authorization?.given_name} ${authorization?.family_name}` : undefined}
      onDarkModeToggle={toggleMode}
      logoIconBlack={logoIconBlack}
      logoIconWhite={logoIconWhite}
      logoTextBlack={logoTextBlack}
      logoTextWhite={logoTextWhite}
      hideNavbar={
        location.pathname === "/login" ||
        location.pathname.startsWith("/confirm-email") ||
        location.pathname.startsWith("/reset-password")
      }
      location={location}
    >
      <AppShellReveal.Navbar>
        {props.space && (
          <>
            <SideNavSubHeading short="Notes" long="Notes" />
            <SideNavLink
              link={`/${props.space}/new-note`}
              icon={faPlus}
              label="New note"
            />
            <SideNavLink
              link={`/${props.space}/browse`}
              icon={faFolderOpen}
              label="Browse"
            />
            <SideNavLink
              link={`/${props.space}/search`}
              icon={faSearch}
              label="Search"
            />
            <SideNavLink
              link={`/${props.space}/graph`}
              icon={faCircleNodes}
              label="Graph"
            />
            <SideNavLink
              link={`/${props.space}/index`}
              icon={faListUl}
              label="Index"
            />
            <SideNavSubHeading short="Library" long="Library" />
            <SideNavLink
              link={`/${props.space}/library`}
              icon={faPlus}
              label="New chapter"
            />
            <SideNavLink
              link={`/${props.space}/library`}
              icon={faBook}
              label="Books"
            />
            <SideNavLink
              link={`/${props.space}/library`}
              icon={faSearch}
              label="Search"
            />
            <SideNavLink
              link={`/${props.space}/library`}
              icon={faListUl}
              label="Index"
            />
            <SideNavSubHeading short="System" long="System" />
            <SideNavLink
              link={`/${props.space}/color-filter`}
              icon={faPalette}
              label="Color filter"
            />
            <SideNavLink
              link={`/${props.space}/metadata-definition`}
              icon={faListUl}
              label="Metadata"
            />
            <SideNavLink
              link={`/${props.space}/stopwords`}
              icon={faStrikethrough}
              label="Stopwords"
            />
            <SideNavLink
              link={`/${props.space}/settings/company`}
              icon={faCogs}
              label="Company setting"
            />
            <SideNavLink
              link={`/${props.space}/settings/user`}
              icon={faUserShield}
              label="User"
            />
            <SideNavLink
              link={`/${props.space}/settings/backup`}
              icon={faDatabase}
              label="Backup and restore"
            />
          </>
        )}
      </AppShellReveal.Navbar>
      <AppShellReveal.MobileNavbar>
        <MobileSidebar space={props.space} />
      </AppShellReveal.MobileNavbar>
      <AppShellReveal.Body>
        <BodyContainer {...props} />
      </AppShellReveal.Body>
    </AppShellReveal>
  );
};

export default MainContent;
