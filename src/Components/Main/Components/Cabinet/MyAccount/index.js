import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Info from "./Components/Info";
import Filters from "./Components/Filters";

import { routsName } from "../../../../../Router/RouterList";
export default function Cabinet(props) {
  return (
    <>
      <Route
        path={routsName.getRoutsUrl(
          routsName.dict.kabinet,
          routsName.dict.moj_akkaunt
        )}
        component={props => <Filters {...props} />}
      />

      <Switch>
        <Route
          path={routsName.getRoutsUrl(
            routsName.dict.kabinet,
            routsName.dict.moj_akkaunt,
            routsName.dict.informacziya
          )}
          component={Info}
        />
        <Redirect
          from={routsName.getRoutsUrl(
            routsName.dict.kabinet,
            routsName.dict.moj_akkaunt
          )}
          exact
          to={routsName.getRoutsUrl(
            routsName.dict.kabinet,
            routsName.dict.moj_akkaunt,
            routsName.dict.informacziya
          )}
        />
      </Switch>
    </>
  );
}
