import React from "react";

// import "./style/documents.css";

import { connect } from "react-redux";

const Documents = props => (
  <div className="documents">
    <div className="documents__header">
      <span>{props.lang.promoDocuments.title}</span>
    </div>
    <div className="documents__container">
      <div className="documents__text">
        <div className="start__content">
          <div className="start__text">
            <p>{props.lang.promoDocuments.subTitle}</p>
          </div>
          <div className="start__text">
            <p>{props.lang.getQualityProduct}</p>
          </div>
          <div className="start__text">
            {props.lang.aboutusPage.discription.map(text => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="start__links">
        <div className="start__link">
          <a
            //  href="https://abet.ru/Documents/Rules.pdf"
            target="_blank"
          >
            {props.lang.rules.block2.title}
          </a>
        </div>
        <div className="start__link">
          <a
            // href="https://abet.ru/Documents/SRO_Memberdship.pdf"
            target="_blank"
          >
            {props.lang.dickParrent}
          </a>
        </div>
        <div className="start__link">
          <a
            // href="https://abet.ru/Documents/Gambling_rules.pdf"
            target="_blank"
          >
            {props.lang.rulesGameA}
          </a>
        </div>
        <div className="start__link">
          <a
            // href="https://abet.ru/Documents/The_federal_law.pdf"
            target="_blank"
          >
            {props.lang.dateDoc}
          </a>
        </div>
        <div className="start__link">
          <a
            // href="https://abet.ru/Documents/License.pdf"
            target="_blank"
          >
            {props.lang.lissingDate}
          </a>
        </div>
        <div className="start__link">
          <a
            // href="https://abet.ru/Documents/Confidentiality_policy.pdf"
            target="_blank"
          >
            {props.lang.securePolic}
          </a>
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
)(Documents);
