import React from "react";

export default function Text3(props) {
  return (
    <div className="offer__body" style={props.style}>
      <div className="offer__content">
        <div className="offer__text">
          <p>
            <b>{props.lang.poserStart.title}</b>
          </p>
        </div>
        {props.lang.poserStart.list1.map(text => (
          <div className="offer__text" key={text}>
            <p>{text}</p>
          </div>
        ))}
      </div>

      <div className="offer__rules">
        <p>
          <b>{props.lang.poserStart.discription.title}</b>
        </p>
        {props.lang.poserStart.discription.list.map(text => (
          <p key={text}>{text}</p>
        ))}
      </div>
    </div>
  );
}
