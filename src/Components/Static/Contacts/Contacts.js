import React from "react";

// import "./style/contacts.css";

import { connect } from "react-redux";
const Contacts = props => (
  <div className="contacts">
    <div className="contacts__header">
      <span>{props.lang.contact}</span>
    </div>

    <div className="contacts__container">
      <div className="contacts__info">
        <div className="contacts__data">
          <div className="contacts__title">{props.lang.contactPage.phone}</div>
          <div className="contacts__main-info">
            {props.lang.contactPage.numberphone}
          </div>
        </div>

        <div className="contacts__data">
          <div className="contacts__title">{props.lang.contactPage.eMail}</div>
          <div className="contacts__main-info">
            {props.lang.contactPage.emailSub}
          </div>
        </div>
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
)(Contacts);
