import React from "react";
import Tournament from "./Tournament";
import { get } from "https";
import { getIcon } from "../../../../Services/Shared";

const routeCategory = (event, route) => {
  if (!event.target.closest(".list-match__arrow")) route();
};

const Category = ({
  name,
  isOpen,
  tournaments,
  route,
  openCategory,
  routeOutright,
  isOutright,
  id,
  getFuncOnFav,
  checkIsTournamentInFav
}) => {
  return (
    <div className={"list-match__elem" + (isOpen ? " open" : "")}>
      {!isOpen ? (
        <div
          className="list-match__description"
          onClick={e => routeCategory(e, route)}
        >
          <div className="list-match__name">{name}</div>
          <div className="list-match__arrow" onClick={openCategory}>
            {getIcon("arrow")}
          </div>
        </div>
      ) : (
        <div className="list-match__country open">
          <div
            className="list-match__description"
            onClick={e => routeCategory(e, route)}
          >
            <div className="list-match__name">{name}</div>
            <div className="list-match__arrow" onClick={openCategory}>
              {getIcon("arrow")}
            </div>
          </div>
          {tournaments ? (
            <div className="list-match__teams ">
              {tournaments
                .sort((a, b) =>
                  a.props.name > b.props.name
                    ? 1
                    : a.props.name < b.props.name
                    ? -1
                    : 0
                )
                .map((tournament, i) => (
                  <Tournament {...tournament.props} />
                ))}
              {isOutright ? (
                <Tournament
                  toFavFunc={getFuncOnFav("outright_" + id)}
                  name="Долгосрочные"
                  isInFav={checkIsTournamentInFav("outright_" + id)}
                  route={routeOutright}
                />
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default Category;
