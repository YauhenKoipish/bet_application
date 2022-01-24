import React from "react";

// import "../Style/user-enter.css";

import { ReactComponent as UserEnter } from "../Image/user-enter/enter.svg";
import { routsName } from "../../../Router/RouterList";

export const LogInButton = (route, color) => {
  // path={routsName.getRoutsUrl(
  //     routsName.dict["login"],
  //     routsName.dict["recoverPassword"]
  // )}

  console.log(
    routsName.getRoutsUrl(routsName.dict["login"], routsName.dict["signin"])
  );
  return (
    <div
      className="header__user-enter user-enter"
      onClick={() =>
        route(
          routsName.getRoutsUrl(
            routsName.dict["login"],
            routsName.dict["signin"]
          )
        )
      }
    >
      <div className="user-enter__button">
        {/* <img src={userEnter} alt="signIn" /> */}
        <UserEnter fill={color} />
      </div>
    </div>
  );
};
