import React from "react";
import { connect } from "react-redux";
import { route } from "../../../Actions/Components/Navigation/";
// import "../Style/main-nav.css";

import { routsName } from "../../../Router/RouterList";
const NavBar = props => {
  const path = getRootPath();
  const { handleClickNavBarItem = f => f } = props;
  const navigate = url => {
    props.navigate(url);
    handleClickNavBarItem(url);
  };

  const hasEventsLive = () => {
    return true;
  };

  return (
    <nav className="header__nav main-nav">
      <ul className="main-nav__list">
        <li
          className={
            "main-nav__item" +
            (path === "prematch" || path === "categories" ? " active" : "")
          }
          onClick={() =>
            navigate(routsName.getRoutsUrl(routsName.dict["prematch"]))
          }
        >
          <span>{props.user.language_user.dict.header.prematch}</span>
        </li>
        {props.stateApp.isLive ? (
          <li
            className={
              "main-nav__item" +
              (path === routsName.dict["live"] ? " active" : "")
            }
            onClick={() =>
              navigate(routsName.getRoutsUrl(routsName.dict["live"]))
            }
          >
            <span>{props.user.language_user.dict.header.live}</span>
          </li>
        ) : (
          ""
        )}
        {props.user.isAuthorize ? (
          <li
            className={
              "main-nav__item" +
              (window.location.pathname.match(
                routsName.getRoutsUrl(
                  routsName.dict["kabinet"],
                  routsName.dict["moi_stavki"]
                )
              )
                ? " active"
                : "")
            }
            onClick={() =>
              navigate(
                routsName.getRoutsUrl(
                  routsName.dict["kabinet"],
                  routsName.dict["moi_stavki"]
                )
              )
            }
          >
            <span>{props.user.language_user.dict.myBets}</span>
          </li>
        ) : (
          ""
        )}
        {!props.stateApp.isOffers && hasEventsLive() ? (
          <li
            className={
              "main-nav__item" +
              (window.location.pathname.match(
                routsName.getRoutsUrl(
                  routsName.dict["kabinet"],
                  routsName.dict["loyalijnostij"]
                )
              )
                ? " active"
                : "")
            }
            onClick={() =>
              navigate(
                routsName.getRoutsUrl(routsName.dict["kabinet"], [
                  "loyalijnostij"
                ])
              )
            }
          >
            <span>{props.user.language_user.dict.header.loality}</span>
          </li>
        ) : (
          ""
        )}

        {props.isBookmaker && (
          <li
            className={
              "main-nav__item " + (path === "currentRates" && " active")
            }
            style={{ display: "block" }}
            onClick={() => navigate("/currentRates/client")}
          >
            <span>Управление</span>
          </li>
        )}
      </ul>
    </nav>
  );
};

const getRootPath = () => {
  return window.location.pathname.split("/")[1];
};

const mapStateToProps = state => {
  return {
    user: state.user,
    stateApp: state.mainSetting,
    isBookmaker: state.isBookmaker
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: url => dispatch(route("push", url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
