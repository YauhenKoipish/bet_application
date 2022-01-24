import React from "react";

export default props => {
  return (
    <div className="line-live__score">
      <div className="line-live__column">
        <div>{props.status}</div>
      </div>
    </div>
  );
};
