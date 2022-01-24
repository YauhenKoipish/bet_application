import React from "react";

export default props => {
    return (
        <div className="line-live__score">
            <div className="line-live__column">
                <div>
                    {props.homeScore}:{props.awayScore}
                </div>
                <div>
                    {props.status === "Пер."
                        ? props.status
                        : props.status + " " + props.time}
                </div>
            </div>
        </div>
    );
};
