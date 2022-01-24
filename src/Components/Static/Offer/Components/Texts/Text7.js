import React from "react";

export default function Text7(props) {
  return (
    <div className="offer__body" style={props.style}>
      <div className="offer__content">
        <div className="offer__text">
          <p>
            <b>{props.lang.promoCuntructor.title}</b>
          </p>
        </div>
        {props.lang.promoCuntructor.subTitle.map(text => (
          <div className="offer__text" key={text}>
            <p>{text}</p>
          </div>
        ))}
      </div>

      <div className="offer__content">
        <div className="offer__text">
          <p>
            <b> {props.lang.promoCuntructor.discription.title}</b>
          </p>
        </div>
        {props.lang.promoCuntructor.discription.list.map(text => (
          <div className="offer__list-el" key={text}>
            {text}
          </div>
        ))}
        <div>{props.lang.promoCuntructor.discription.offerTextOne}</div>
        <div>{props.lang.promoCuntructor.discription.offerTextTwo}</div>
      </div>

      <div className="offer__rules">
        {props.lang.promoCuntructor.discription.footerList.map(text => (
          <p key={text}>{text}</p>
        ))}
      </div>
    </div>
  );
}
