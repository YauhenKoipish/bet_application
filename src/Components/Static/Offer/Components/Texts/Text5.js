import React from "react";

export default function Text5(props) {
  return (
    <div className="offer__body" style={props.style}>
      <div className="offer__content">
        <div className="offer__text">
          <p>
            <b>{props.lang.promoBonusTennis.title}</b>
          </p>
        </div>
        {props.lang.promoBonusTennis.subTitle.map(text => (
          <div className="offer__text" key={text}>
            <p>{text}</p>
          </div>
        ))}
      </div>

      <div className="offer__table">
        <div className="offer__column">
          {props.lang.promoBonusTennis.leftColumn.map(text => (
            <div key={text}>{text}</div>
          ))}
        </div>
        <div className="offer__column">
          {props.lang.promoBonusTennis.rightColumn.map(text => (
            <div key={text}>{text}</div>
          ))}
        </div>
      </div>

      <div className="offer__rules">
        {props.lang.promoBonusTennis.offer__Rules.map(text => (
          <p key={text}>{text}</p>
        ))}
      </div>
    </div>
  );
}
