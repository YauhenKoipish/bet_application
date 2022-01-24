import React from "react";

// import "./style/partnership.css";
import { connect } from "react-redux";
const Partnership = props => (
  <div className="partnership">
    <div className="cookies__header">
      <span>{props.lang.partnerProgramm}</span>
    </div>
    <div className="partnership__text">
      {props.lang.partenershipProgram.list.map(text => (
        <div className="partnership__component" key={text}>
          <p>{text}</p>
        </div>
      ))}
      <div className="partnership__component">
        {props.lang.partenershipProgram.secondArray.map(text => (
          <p key={text}>{text}</p>
        ))}
      </div>

      <div className="partnership__component">
        <p>{props.lang.partenershipProgram.footerTitle}</p>
      </div>
    </div>
  </div>
);
const mapStateToProps = state => {
  return {
    lang: state.user.language_user.dict
  };
};

export default connect(
  mapStateToProps,
  null
)(Partnership);
