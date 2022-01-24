import React from "react";
import { getSportByName } from "../../../Services/Shared";

export default props => {
    const { parentProps, sports } = props;
    const sport = getSportByName(sports, parentProps.match.params.sport);

    return (
        <React.Fragment>
            {sport ? (
                <div className="top-nav__nav">
                    <div className="top-nav__name">{sport.name}</div>
                </div>
            ) : (
                ""
            )}
        </React.Fragment>
    );
};
