import React from "react";
import { connect } from "react-redux";
import { transliterate } from "../../Services/Shared";
import { route } from "../../Actions/Components/Navigation/";
import { Route, Router, Switch } from "react-router-dom";
import history from "../../Router/History";
import ScrollMenu from "./";
import Category from "./Components/Category";

import { routsName } from "../../Router/RouterList";
let scrollX = 0;
const setScroll = val => {
  scrollX = val;
};

const ScrollMenuContainer = props => {
  const getPropsForScrollMenu = (parentProps, status, time = Infinity) => {
    const scrollProps = { ...parentProps };
    scrollProps.filters = {};
    scrollProps.filters.status = [status];
    scrollProps.filters.time = time;
    return scrollProps;
  };
  const rootProps = props;
  if (props.searchData) return "";

  const handleClick = rootComponent => {
    return sport =>
      props.navigate(
        "/" + rootComponent + "/" + transliterate(sport.name, true)
      );
  };

  return (
    <Router history={history}>
      <Switch>
        <Route
          path={routsName.getRoutsUrl(routsName.dict.prematch, ":sport")}
          component={props => (
            <ScrollMenu
              {...getPropsForScrollMenu(
                props,
                0,
                rootProps.timeFilter.active.val
              )}
              scrollX={scrollX}
              onScroll={setScroll}
              rootComponent="prematch"
              handleClick={handleClick("prematch")}
              ScrollComponent={Category}
              active={props.match.params.sport}
            />
          )}
        />
        <Route
          path={routsName.getRoutsUrl(routsName.dict.prematch)}
          component={props => (
            <ScrollMenu
              {...getPropsForScrollMenu(
                props,
                0,
                rootProps.timeFilter.active.val
              )}
              scrollX={scrollX}
              onScroll={setScroll}
              rootComponent="prematch"
              handleClick={handleClick("prematch")}
              ScrollComponent={Category}
              active={"all"}
            />
          )}
        />
        {props.stateApp.isLive ? (
          <Switch>
            <Route
              path={routsName.getRoutsUrl(routsName.dict.live, ":sport")}
              component={props => (
                <ScrollMenu
                  {...getPropsForScrollMenu(props, 1)}
                  scrollX={scrollX}
                  onScroll={setScroll}
                  rootComponent={routsName.dict["live"]}
                  handleClick={handleClick(routsName.dict["live"])}
                  ScrollComponent={Category}
                  active={props.match.params.sport}
                />
              )}
            />
            <Route
              path={routsName.getRoutsUrl(routsName.dict.live)}
              component={props => (
                <ScrollMenu
                  {...getPropsForScrollMenu(props, 1)}
                  scrollX={scrollX}
                  onScroll={setScroll}
                  rootComponent={routsName.dict["live"]}
                  handleClick={handleClick(routsName.dict["live"])}
                  ScrollComponent={Category}
                  active={"all"}
                />
              )}
            />
          </Switch>
        ) : (
          ""
        )}
        } />
      </Switch>
    </Router>
  );
};

const mapStateToProps = state => {
  return {
    timeFilter: state.filters.timeFilter,
    searchData: state.search.data,
    stateApp: state.mainSetting
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: url => dispatch(route("push", url))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScrollMenuContainer);
