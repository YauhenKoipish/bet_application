import React from "react";

export default function Advice(props) {
  const getText = type => {
    switch (type) {
      case 2:
        return "Добавьте одно или более событий и расширьте экспресс";
      case 1:
      default:
        return "Добавьте одно или более событий и сделайте из ординара экспресс";
    }
  };

  return (
    <div className="bets__advice bet-advice">
      <div className="bet-advice__text">{getText(props.type)}</div>
      <div className="bet-advice__button">
        <button onClick={props.handleClick}>Понятно</button>
      </div>
    </div>
  );
}
