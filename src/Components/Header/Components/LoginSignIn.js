import React from "react";
import { connect } from "react-redux";
import {
  openAccount,
  closeAccount
} from "../../../Actions/Components/StateComponents/";

import {
  logouteAccount,
  authorizeFail
} from "../../../Actions/Components/Server/Case3/";
import AccountMenu from "./Components/AccountMenu";

// import "../Style/user-info.css";
// import "../Style/bonus.css";
// import "../Style/user-nav.css";
// import "../Style/replenishment-button.css";

const LogInSignIn = props => {
  return (
    <div className="header__user user">
      <AccountMenu {...props} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    accountMenu: state.accountMenu,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleAccount: isOpen => {
      isOpen ? dispatch(closeAccount()) : dispatch(openAccount());
    },
    closeAccount: () => {
      dispatch(logouteAccount());
    },
    authorizeFail: () => {
      dispatch(authorizeFail());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInSignIn);
