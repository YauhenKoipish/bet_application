import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import HistoryOperation from "./Components/HistoryOperation/";
import Balance from "./Components/Balance/";
import Output from "./Components/Output/";
import Input from "./Components/Input/";
import Filters from "./Components/Filters";
import { routsName } from "../../../../../Router/RouterList";
export default function Cabinet(props) {
  const historyOperation = React.createRef();
  return (
    <>
      <Route
        path={routsName.getRoutsUrl(
          routsName.dict.kabinet,
          routsName.dict.moj_schet
        )}
        component={props => <Filters {...props} />}
      />

      <Switch>
        <Route
          path={routsName.getRoutsUrl(
            routsName.dict.kabinet,
            routsName.dict.moj_schet,
            routsName.dict.popolnenie
          )}
          component={Input}
        />
        <Route
          path={routsName.getRoutsUrl(
            routsName.dict.kabinet,
            routsName.dict.moj_schet,
            routsName.dict.vyvod
          )}
          component={Output}
        />
        <Route
          path={routsName.getRoutsUrl(
            routsName.dict.kabinet,
            routsName.dict.moj_schet,
            routsName.dict.balans
          )}
          component={Balance}
        />
        <Route
          path={routsName.getRoutsUrl(
            routsName.dict.kabinet,
            routsName.dict.moj_schet,
            routsName.dict.istoriya
          )}
          component={props => (
            <HistoryOperation {...props} ref={historyOperation} />
          )}
        />
        <Redirect
          from={routsName.getRoutsUrl(
            routsName.dict.kabinet,
            routsName.dict.moj_schet
          )}
          exact
          to={routsName.getRoutsUrl(
            routsName.dict.kabinet,
            routsName.dict.moj_schet,
            routsName.dict.balans
          )}
        />
      </Switch>
    </>
  );
}
