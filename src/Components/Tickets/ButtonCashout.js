import React from "react";
import { splitRangNumber, getIcon } from "../../Services/Shared";

import { connect } from "react-redux";
import Loading from "../Loading/";

function Button(props) {
  if (!props.isEdited && !props.cashout) return "";
  return (
    <>
      <div className="bets__buttons">
        <div className="bets__buttons-set">
          <div
            onClick={props.handleClickMainButton}
            className={
              "bets__cashout-button bets__cashout " +
              (props.isEdited && !props.isButtonSaveChangesActive
                ? " opacity50"
                : "")
            }
          >
            {getButtonContent(props)}
          </div>
          { !props.isEdited ? (
            <div
              className="bets__settings-button"
              onClick={props.handleClickPartCashout}
            >
              {getIcon("part__cashout")}
            </div>
          ) : (
            ""
          )}
        </div>
        {props.children}
      </div>
    </>
  );
}

const getCashoutContent = props => {
  return props.preloader &&
    props.preloader.type === "cashout" &&
    props.preloader.ticketId === props.ticketId ? (
    <Loading />
  ) : (
    <>
      <span>{props.lang.cheshaout}</span>
      <span />
      <span>{splitRangNumber(props.cashout)}</span>
      {/* <span>{splitRangNumber(Math.floor(props.cashout))}</span> */}
    </>
  );
};

const getSavingChangesContent = props => {
  return props.preloader &&
    props.preloader.type === "savingChanges" &&
    props.preloader.ticketId === props.ticketId ? (
    <Loading />
  ) : (
    <>
      <span />
      <span>{props.lang.saveEdit}</span>
      <span />
    </>
  );
};

const getButtonContent = props => {
  return !props.isEdited
    ? getCashoutContent(props)
    : getSavingChangesContent(props);
};

const mapStateToProps = state => {
  return {
    preloader: state.tickets.preloader,
    lang: state.user.language_user.dict
  };
};

export default connect(mapStateToProps)(Button);
