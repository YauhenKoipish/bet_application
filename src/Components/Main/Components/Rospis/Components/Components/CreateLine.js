import React from "react";

import Line from "./OneLineCreate";
import {
    sortLinesBySpecifier
} from "../../../../../../Services/Shared";
const CreateLine = props => {
    // console.log(props);
    // debugger;
    let linesArray = [...props.lines];
    linesArray = linesArray.sort(sortLinesBySpecifier);

    return (
        <React.Fragment>
            {linesArray.map((line, i) => {
                return (
                    <Line
                        line={line}
                        key={line.compoundKey}
                        event={props.event}
                    />
                );
            })}
        </React.Fragment>
    );
};

export default CreateLine;
