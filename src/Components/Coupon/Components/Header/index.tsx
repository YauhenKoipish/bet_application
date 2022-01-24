import React from "react";
import { getSportIcon, getIcon } from "../../../../Services/Shared";

export default function index(props) {
  return (
    <div className="bets-window__titles button_bottom">
      <div
        className={
          "bets-window__title bet_slip_coupon" +
          (props.activeComponent === "coupon" ? " active" : "")
        }
        onClick={() => props.changeActiveComponent("coupon")}
      >
        <div className="itm active">
          <span> {props.lang.coupon} </span>
          {props.count.length > 0 ? (
            <div className="coupon-open__quantity">{props.count.length}</div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div
        className={
          "bets-window__title" +
          (props.activeComponent === "bets" ? " active" : "")
        }
        onClick={() => props.changeActiveComponent("bets")}
      >
        <div className="itm mrg-r">
          <span> {props.lang.bets}</span>
        </div>
      </div>
      <div
        className={
          "bets-window__title setting" +
          (props.activeComponent === "settings" ? " active" : "")
        }
        onClick={() => props.changeActiveComponent("settings")}
      >
        {getIcon("setting")}
      </div>
      <div className="bets-window__close" onClick={props.closeCoupon}>
        {getSportIcon("close")}
      </div>
    </div>
  );
}
