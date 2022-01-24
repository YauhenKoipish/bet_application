import React from "react";

export default function Text8(props) {
  return (
    <div className="offer__body" style={props.style}>
      <div className="offer__content">
        <div className="offer__text">
          <p>
            <b>{props.lang.promoEditor.title}</b>
          </p>
        </div>
        {props.lang.promoEditor.subTitle.map(text => (
          <div className="offer__text" key={text}>
            <p>{text}</p>
          </div>
        ))}
      </div>

      <div className="offer__rules">
        {props.lang.promoEditor.list.map(text => (
          <p key={text}>{text}</p>
        ))}
      </div>
    </div>
  );
}
