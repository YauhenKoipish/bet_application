import React from "react";
import { splitRangNumber } from "../../../../../../../Services/Shared";

export default function Info({ minSum = 0, maxSum = 0, lang }) {
  return (
    <div className="user-replenishment__info">
      <div className="user-replenishment__rule">
        <div className="user-replenishment__title">{lang.sumReplenishmnt}</div>
        <div className="user-replenishment__description">
          {lang.ot} {splitRangNumber(Math.floor(minSum))}₽ {lang.do}
          {splitRangNumber(Math.floor(maxSum))}₽
        </div>
      </div>
      {/* <div className="user-replenishment__rule">
        <div className="user-replenishment__title">Время выполнения:</div>
        <div className="user-replenishment__description">мгновенно</div>
      </div>
      <div className="user-replenishment__rule">
        <div className="user-replenishment__title">Комиссия:</div>
        <div className="user-replenishment__description">отсутствует</div>
      </div> */}
    </div>
  );
}
