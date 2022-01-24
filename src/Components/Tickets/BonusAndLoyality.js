import React from "react";
import { splitRangNumber } from "../../Services/Shared";

export default function BonusAndLoyality(props) {
  return (
    <div className="bets__privilege">
      <div className="bets__loyalty bonus-loyalty">
        <div className="bets__type">Бонус</div>
        <div className="bets__quantity">{splitRangNumber(props.bonus)}</div>
      </div>

      <div className="bets__loyalty">
        <div className="bets__type">Лояльность</div>
        <div className="bets__quantity">{splitRangNumber(props.loyality)}</div>
      </div>
    </div>
  );
}
