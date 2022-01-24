import React from "react";
import FavSports from "./FavSportsPrematch";
import Sports from "./SportsPrematch";

export default props => {
    const {
        sports,
        addSportToFav,
        removeSportFromFav,
        removeTournamentFromFav,
        favSports,
        favTournaments,
        navigate,
        route,
        sportsMap,
        categoriesMap,
        navigateFunc,
        activeLink
    } = props;
    return (
        <React.Fragment>
            {
                <FavSports
                    sports={favSports}
                    tournaments={favTournaments}
                    removeSport={removeSportFromFav}
                    removeTournament={removeTournamentFromFav}
                    navigate={navigate}
                    route={route}
                    sportsMap={sportsMap}
                    categoriesMap={categoriesMap}
                    navigateFunc={navigateFunc}
                />
            }
            {
                <Sports
                    sports={sports}
                    onPlus={addSportToFav}
                    onMinus={removeSportFromFav}
                    favSports={favSports}
                    navigate={navigate}
                    activeLink={activeLink}
                />
            }
        </React.Fragment>
    );
};
