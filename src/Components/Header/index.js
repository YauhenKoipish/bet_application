import React from "react";
import { connect } from "react-redux";

// import "./Style/user.css";
// import "./Style/header.css";

import Logo from "./Components/Logo";
import NavBar from "./Components/NavBar";

import StreamNavBar from "./Components/StreamNavBar";
import { LogInButton } from "./Components/LogInButton";
import LogInSignIn from "./Components/LoginSignIn";
import { route } from "../../Actions/Components/Navigation/";

import { changeLanguage } from "../../Actions/Components/Language/";
import {
  setLocalStorage,
  getLocalStorageData
} from "../../Services/LocalStorage";

import { changeActiveValueTimeFilter } from "../../Actions/Components/Filters/";

import { setStateLoadData, resetState } from "../../Actions/Components/Server/";

import { createSocket } from "../Socket/";
import { getInfoXhrReqire } from "../../Server/";

import SwitherLang from "./Components/SwitherLang";

const Header = props => {
  function changeInfo(lang) {
    getInfoXhrReqire(`/${lang}.json`, "GET").then(
      response => {
        setLocalStorage("Language", lang);
        const dict = JSON.parse(response);
        props.changeLanguage({ lang, dict });

        createSocket.socketClose(setStateLoadData);

        createSocket.socketReconnect(
          props.settingApp.socketURL,
          getLocalStorageData("Language")
        );

        props.changeActiveValueTimeFilter({
          name: dict[props.filter.active.activeText],
          val: props.filter.active.val,
          activeText: props.filter.active.activeText
        }); // фильтры

        props.history.push("/");
        return dict;
      },
      error => {
        console.error("НЕ СМОГ ПОЛУЧИТЬ ЯЗЫК getLanguageDict");
        return "";
      }
    );
  }

  //   const getModal = () => (
  //     <div className="fixed">
  //       <div className="title">
  //         {props.lang.modal.successRegistration.welcome}
  //       </div>
  //       <div className="title">{props.lang.confirmSelectLanguage}</div>
  //       <div className="flex">
  //         <button
  //           className={
  //             "changeLang " +
  //             (props.user.language_user.value === "ru" ? "active" : "")
  //           }
  //           onClick={
  //             props.user.language_user.value === "ru"
  //               ? f => f
  //               : () => changeInfo("ru")
  //           }
  //         >
  //           Русский
  //         </button>
  //         <button
  //           className={
  //             "changeLang " +
  //             (props.user.language_user.value === "en" ? "active" : "")
  //           }
  //           onClick={
  //             props.user.language_user.value === "en"
  //               ? f => f
  //               : () => changeInfo("en")
  //           }
  //         >
  //           English
  //         </button>
  //       </div>
  //     </div>
  //   );

  function changeTheme(val) {
    document.documentElement.style.setProperty("--body-color", val);
  }

  return (
    <header className="header">
      <Logo />
      {props.location.pathname.split("/")[1] != "mobile" ? (
        <NavBar route={props} />
      ) : (
        <StreamNavBar {...props} />
      )}
      {props.settingApp.isTestFeatures ? (
        <>
          {/* {props.user.language_user.isModalShow ? getModal() : ""} */}
          {/* {!props.user.isAuthorize ? ( */}
          <SwitherLang changeInfo={changeInfo.bind(this)} />
          {/* ) : (
            ""
          )} */}
        </>
      ) : (
        ""
      )}
      {props.user.responseAuthorize === 0 ? (
        <LogInSignIn />
      ) : (
        LogInButton(props.navigate, props.settingApp.loginColor)
      )}
    </header>
  );
};

const mapStateToProps = state => {
  return {
    settingApp: state.mainSetting,
    user: state.user,
    filter: state.filters.timeFilter,
    socket: state.socket,
    lang: state.user.language_user.dict
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: url => dispatch(route("push", url)),
    changeLanguage: lang => dispatch(changeLanguage(lang)),
    changeActiveValueTimeFilter: val => {
      dispatch(changeActiveValueTimeFilter(val));
    },

    resetState: () => dispatch(resetState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
