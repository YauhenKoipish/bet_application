import React from "react";

export default function Text4(props) {
  return (
    <div className="offer__body" style={props.style}>
      <div className="offer__content">
        <div className="offer__text">
          <p>
            <b>{props.lang.promoBonusFootball.title}</b>
          </p>
        </div>
        {props.lang.promoBonusFootball.subTitle.map(text => (
          <div className="offer__text" key={text}>
            <p>{text}</p>
          </div>
        ))}
      </div>

      <div className="offer__table">
        <div className="offer__column">
          {props.lang.promoBonusFootball.leftColumn.map(text => (
            <div key={text}>{text}</div>
          ))}
        </div>
        <div className="offer__column">
          {props.lang.promoBonusFootball.rightColumn.map(text => (
            <div key={text}>{text}</div>
          ))}
        </div>
      </div>

      <div className="offer__rules">
        {props.lang.promoBonusFootball.offer__Rules.map(text => (
          <p key={text}>{text}</p>
        ))}
      </div>
    </div>
  );
}
