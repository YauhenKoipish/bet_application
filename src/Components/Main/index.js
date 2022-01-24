import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Prematch from "../Prematch/";
import Live from "../Live/";
import Categories from "../Categories/";

import PaintingContainer from "./Components/Rospis/";

import Cookies from "../Static/cookies/";
import Data from "../Static/data/";
import Documents from "../Static/documents/";
import MoneyAction from "../Static/money-action/";
import Offerings from "../Static/offerings/";
import Offer from "../Static/Offer/";
import Partnership from "../Static/partnership/";
import Responsible from "../Static/responsible/";
import Faq from "../Static/faq/";
import AboutUs from "../Static/Company/AboutUs.js";
import Contacts from "../Static/Contacts/Contacts.js";
import Rules from "../Static/Rules/";

import AuthorizeForm from "../AuthorizeForm/";
import {
  scrollTop,
  removeStickyContent,
  getCookie
} from "../../Services/Shared";
import Cabinet from "./Components/Cabinet/";

import { routsName } from "../../Router/RouterList";

import TableOffice from "../Bookmaker/Table/";

export default props => {
  const { isBookmaker } = props;
  scrollTop(props.historyRoute);
  removeStickyContent();
  if (!getCookie("betteg")) {
    // debugger;
    const value = window.location.href;
    if (value.indexOf("?btag=") != -1) {
      let date = new Date(new Date().getTime() + 1209600 * 1000);
      document.cookie =
        `betteg=${value.split("?btag=")[1]}; path=/; expires=` +
        date.toUTCString();
      localStorage.setItem(
        "betteg",
        value.split("?btag=")[1] + "_____" + date.toUTCString()
      );
    }
  }

  return (
    <>
      <Switch>
        <Route
          path={routsName.getRoutsUrl(routsName.dict.prematch)}
          component={Prematch}
        />
        {isBookmaker && (
          <Route
            path={routsName.getRoutsUrl("currentRates/:component")}
            component={TableOffice}
          />
        )}
        {props.setting.isLive ? (
          <Route
            path={routsName.getRoutsUrl(routsName.dict.live)}
            component={Live}
          />
        ) : (
          ""
        )}
        <Route
          path={routsName.getRoutsUrl(routsName.dict.categories)}
          component={Categories}
        />
        <Route
          path={routsName.getRoutsUrl(routsName.dict.company)}
          component={AboutUs}
        />
        <Route
          path={routsName.getRoutsUrl(routsName.dict.login)}
          component={AuthorizeForm}
        />
        <Route
          path={routsName.getRoutsUrl(routsName.dict.cookies)}
          component={Cookies}
        />
        <Route
          path={routsName.getRoutsUrl(routsName.dict.data)}
          component={Data}
        />
        <Route
          path={routsName.getRoutsUrl(routsName.dict.documents)}
          component={Documents}
        />
        <Route
          path={routsName.getRoutsUrl(routsName.dict.moneyAction)}
          component={MoneyAction}
        />
        {props.setting.isOffers ? (
          <Route
            path={routsName.getRoutsUrl(routsName.dict.offerings)}
            component={Offerings}
          />
        ) : (
          ""
        )}
        <Route
          path={routsName.getRoutsUrl(routsName.dict.offer, ":num")}
          component={Offer}
        />
        <Route
          path={routsName.getRoutsUrl(routsName.dict.partnership)}
          component={Partnership}
        />
        <Route
          path={routsName.getRoutsUrl(routsName.dict.responsible)}
          component={Responsible}
        />
        <Route
          path={routsName.getRoutsUrl(routsName.dict.rules)}
          component={Rules}
        />
        <Route
          path={routsName.getRoutsUrl(routsName.dict.contacts)}
          component={Contacts}
        />
        <Route
          path={routsName.getRoutsUrl(routsName.dict.faq)}
          component={Faq}
        />
        <Route
          path={routsName.getRoutsUrl(routsName.dict.kabinet)}
          component={Cabinet}
        />
        <Route
          path={routsName.getRoutsUrl(
            routsName.dict.rospis,
            ":sport/:category/:tournament/:event"
          )}
          component={PaintingContainer}
        />

        {/* <Route path="/mobile/video" component={StreamPage} />
      <Route path="/mobile/documents" component={StatickTV} />
      <Route path="/mobile/allevent" component={ListEvent} />
      <Route path="/mobile/promo" component={Promo} /> */}

        {isBookmaker && (
          <Route
            path={routsName.getRoutsUrl("currentRates")}
            component={TableOffice}
          />
        )}

        <Redirect
          from={routsName.getRoutsUrl(routsName.dict.offer)}
          to={routsName.getRoutsUrl(routsName.dict.offer, "1")}
        />
        <Redirect
          from="/"
          to={routsName.getRoutsUrl(routsName.dict.prematch)}
        />
      </Switch>
    </>
  );
};
