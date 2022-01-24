import React from "react";

export default function Text2(props) {
  return (
    <div className="offer__body" style={props.style}>
      <div className="offer__content">
        <div className="offer__text">
          <p>
            <b>{props.lang.returnMoney.block1.title}</b>
          </p>
        </div>

        {props.lang.returnMoney.block1.list1.map(text => (
          <div className="offer__text" key={text}>
            <p>{text}</p>
          </div>
        ))}
      </div>

      <div className="offer__rules">
        <p>
          <b>{props.lang.returnMoney.block1.discription.title}</b>
        </p>
        {props.lang.returnMoney.block1.discription.list.map(text => (
          <p key={text}>{text}</p>
        ))}
      </div>
    </div>
  );
}
