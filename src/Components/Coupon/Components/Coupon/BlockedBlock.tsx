import React from "react";

const BlockedBlock = props => {
  const { text = "" } = props;
  return (
    <div className="coupon-item__block">
      <span>{text}</span>
    </div>
  );
};

export default BlockedBlock;
