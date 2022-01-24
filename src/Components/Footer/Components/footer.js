import React from "react";
import { connect } from "react-redux";
import { route } from "../../../Actions/Components/Navigation/";
// import "./Style/footer.css";

import { routsName } from "../../../Router/RouterList";
import { setLocalStorage } from "../../../Services/LocalStorage";
import { varibleCss } from "../../../Constants";
import { changeTheme } from "../../../Services/ThemeSetting";

const Footerсomponents = props => {
  function setTheme(nameTheme) {
    setLocalStorage("Theme", nameTheme);
    changeTheme(nameTheme, props.settingApp);
  }

  return (
    <div className="footer">
      <div className="footer__main">
        <div className="footer__columns" style={{ justifyContent: "center" }}>
          abet-promo.com
          {/* <div className="footer__column">
            <div className="footer__title">{props.route.lang.aboutusShort}</div>
            <ul className="footer__list">
              <li
                className="main-nav__item"
                onClick={() =>
                  props.navigate(routsName.getRoutsUrl(routsName.dict.company))
                }
              >
                {props.route.lang.aboutus}
              </li>
              {props.settingApp.isOffers ? (
                <li
                  className="main-nav__item"
                  onClick={() =>
                    props.navigate(
                      routsName.getRoutsUrl(routsName.dict.offerings)
                    )
                  }
                >
                  {props.route.lang.offerAndreq}
                </li>
              ) : (
                ""
              )}
              <li
                className="main-nav__item"
                onClick={() =>
                  props.navigate(
                    routsName.getRoutsUrl(routsName.dict.partnership)
                  )
                }
              >
                {props.route.lang.partnerProgramm}
              </li>
              <li
                className="main-nav__item"
                onClick={() =>
                  props.navigate(
                    routsName.getRoutsUrl(routsName.dict.documents)
                  )
                }
              >
                {props.route.lang.doc}
              </li>
              <li
                className="main-nav__item"
                onClick={() =>
                  props.navigate(routsName.getRoutsUrl(routsName.dict.contacts))
                }
              >
                {props.route.lang.contact}
              </li>
              {/* <li
                className="main-nav__item"
                onClick={() =>
                  props.navigate(routsName.getRoutsUrl(routsName.dict.feedback))
                }
              >
                {props.route.lang.returnContact} - TBD
              </li> 
            </ul>
          </div> */}
          {/* 
          <div className="footer__column">
            <div className="footer__title">{props.route.lang.header.faq}</div>
            <ul className="footer__list">
              <li
                className="main-nav__item"
                onClick={() =>
                  props.navigate(routsName.getRoutsUrl(routsName.dict.rules))
                }
              >
                {props.route.lang.termAndConditions}
              </li>
              <li
                onClick={() =>
                  props.navigate(
                    routsName.getRoutsUrl(routsName.dict.moneyAction)
                  )
                }
              >
                {props.route.lang.methodsInputOrOutput}
              </li>
              <li
                onClick={() =>
                  props.navigate(routsName.getRoutsUrl(routsName.dict.faq))
                }
              >
                {props.route.lang.fAQ}
              </li>
              <li
                onClick={() =>
                  props.navigate(
                    routsName.getRoutsUrl(routsName.dict.responsible)
                  )
                }
              >
                {props.route.lang.responsibleGaming}
              </li>
              <li
                onClick={() =>
                  props.navigate(routsName.getRoutsUrl(routsName.dict.data))
                }
              >
                {props.route.lang.secureDate}
              </li>
              <li
                onClick={() =>
                  props.navigate(routsName.getRoutsUrl(routsName.dict.cookies))
                }
              >
                {props.route.lang.cookies}
              </li>
            </ul>
          </div>
        */}
        </div>
      </div>

      {/* <div className="footer__footer">
        {Object.keys(props.settingApp.theme).map(nameTheme => {
          return (
            <div
              className="change_theme"
              style={{ color: nameTheme["base-1"] }}
              onClick={() => setTheme(nameTheme)}
              key={nameTheme}
            >
              {nameTheme}
            </div>
          );
        })}

        <div className="footer__age">
          <div className="footer__restrict" />
        </div>
      </div> */}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    settingApp: state.mainSetting
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: url => dispatch(route("push", url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footerсomponents);
