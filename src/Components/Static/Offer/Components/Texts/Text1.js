import React from "react";

export default function Text1(props) {
  return (
    <div className="offer__body" style={props.style}>
      <div className="offer__content">
        {props.lang.promoPayout.list1.map(text => (
          <div className="offer__text" key={text}>
            <p>{text}</p>
          </div>
        ))}

        <div className="offer__rules">
          {props.lang.promoPayout.list2.map(text => (
            <p key={text}>{text}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
