import React from "react";
import { Redirect } from "react-router-dom";
import { routsName } from "../../Router/RouterList";

const NoMatch = () => {
    <Redirect to={"/" + routsName.dict.prematch} />;
};

export default NoMatch;
