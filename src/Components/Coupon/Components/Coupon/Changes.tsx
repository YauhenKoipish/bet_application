import React from "react";

export default function Changes(props) {
  return (
    <div className="coupon__changes">
      <span>В одном или нескольких событиях произошли изменения</span>
      <div className="coupon__changes-button" onClick={props.acceptChanges}>
        <button>Принять изменения</button>
      </div>
    </div>
  );
}
