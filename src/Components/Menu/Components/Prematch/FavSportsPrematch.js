import React from "react";

import SingleSport from "./SingleSportPrematch";
import {
  getSportIcon,
  sortCallbackBySortIdAndName
} from "../../../../Services/Shared";
import { connect } from "react-redux";
import { routsName } from "../../../../Router/RouterList";

const FavSports = props => {
  const items = getFavPrematch(props);
  // console.log(props);
  return (
    <div
      className={
        "left-menu__top " +
        (items && items.length >= 1 ? "left-menu-border" : "")
      }
      id="menu-favSports"
    >
      {SingleSport({
        name: props.lang.myMatch,
        icon: getSportIcon(-1),
        MinusOrPlus: null,
        key: 0,
        isT: false,
        route: () => props.route(routsName.dict.moi_matchi)
      })}
      {items ? items.map((fav, i) => SingleSport(fav)) : ""}
    </div>
  );
};

const getFavPrematch = props => {
  const { sports, tournaments, sportsMap, categoriesMap } = props;
  if (!sports || !tournaments || !sportsMap) return null;
  const allSports = getAllFavSports(sports, tournaments, sportsMap);
  const favArr = [];
  let i = 0;
  allSports.forEach(sport => {
    favArr.push(
      getSportProps(
        props,
        sport.sport,
        getSportIcon(sport.sport.id),
        false,
        isSportInArr(sport.sport.id, sports) ? true : false,
        i
      )
    );
    i++;
    sport.tournaments.forEach(t => {
      favArr.push(
        getSportProps(
          props,
          t,
          null,
          true,
          true,
          i,
          props.navigate.bind(
            this,
            getRouteFuncArg(t, true, sportsMap, categoriesMap)
          )
        )
      );
      i++;
    });
  });
  return favArr;
};

const getAllFavSports = (sports, tournaments, sportsMap) => {
  const fav = [];
  let allSports = [];
  sports.forEach((sport, i) => {
    allSports[i] = {
      sport: sport,
      tournaments: []
    };
  });
  tournaments.forEach(t => {
    const sportObjInArr = isSportInArrAllSports(t.sportId, allSports);
    const sport = getSportById(t.sportId, sportsMap);
    if (!sportObjInArr) {
      if (sport)
        allSports.push({
          sport: sport,
          tournaments: [t]
        });
    } else {
      if (sport) {
        if (
          !isTournamentInArr(
            t.id,
            allSports[allSports.indexOf(sportObjInArr)].tournaments
          )
        ) {
          allSports[allSports.indexOf(sportObjInArr)].tournaments.push(t);
          allSports[allSports.indexOf(sportObjInArr)].tournaments.sort((a, b) =>
            sortCallbackBySortIdAndName(a, b)
          );
        }
      }
    }
  });
  return allSports.sort((a, b) => sortCallbackBySortIdAndName(a, b, "sport"));
};

const isSportInArrAllSports = (id, arr) => {
  return arr.find(sport => id === sport.sport.id);
};

const isSportInArr = (id, arr) => {
  return arr.find(sport => id === sport.id);
};

const isTournamentInArr = (id, arr) => {
  return arr.find(t => id === t.id);
};

const getSportById = (id, sports) => {
  if (!id) return null;
  if (sports.size === 0) return null;
  if (!sports.has(id)) return null;
  return sports.get(id);
};

const getCategoryById = (id, categories) => {
  if (!id) return null;
  if (categories.size === 0) return null;
  if (!categories.has(id)) return null;
  return categories.get(id);
};

const getRouteFuncArg = (val, isT, sports, categories) => {
  if (isT) {
    const category = getCategoryById(val.categoryId, categories);
    if (!category) return "";
    const sport = getSportById(val.sportId, sports);
    if (!sport) return "";
    return sport.name + "/" + category.name + "/" + val.name;
  } else return val.name;
};

const getSportProps = (props, val, icon, isT, isCallback, key, route) => {
  route = val.isOutright
    ? () => props.navigateFunc(val.url)
    : !route
    ? props.navigate.bind(this, val.name)
    : route;
  return {
    name: val.name,
    icon: icon,
    MinusOrPlus: isCallback ? "minus" : "",
    key: key,
    clickFunc: isCallback
      ? isT
        ? props.removeTournament.bind(this, val.id)
        : props.removeSport.bind(this, val.id)
      : "",
    route: route,
    isT: isT
  };
};

// export default FavSports;

const mapStateToProps = state => {
  return {
    lang: state.user.language_user.dict
  };
};

export default connect(mapStateToProps)(FavSports);
