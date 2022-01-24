import React from "react";

import { connect } from "react-redux";
// import "./style/about-us.css";

const AboutUs = props => (
  <div className="about-us">
    <div className="about-us__header">
      <span>{props.lang.aboutus}</span>
    </div>
    <div className="about-us__text">
      <div className="about-us__component">
        {props.lang.aboutusPage.discription.map(text => (
          <p key={text}>{text}</p>
        ))}
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
)(AboutUs);
