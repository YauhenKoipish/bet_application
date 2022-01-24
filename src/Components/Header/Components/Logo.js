import React from "react";

import logoBig from "../Image/logo/logo-big.svg";
import logoSmall from "../Image/logo/logo-small.svg";
import { connect } from "react-redux";
import { route } from "../../../Actions/Components/Navigation/";
import{getIcon} from "../../../Services/Shared"

// import "../Style/logo.css";

import { routsName } from "../../../Router/RouterList";

const Logo = props => {
  return (
    <div
      className="header__logo logo"
      onClick={() =>
        props.navigate(routsName.getRoutsUrl(routsName.dict.prematch))
      }
    >
      <picture className="logo__img">
        <source media="(min-width: 600px)" srcSet={logoBig} />
        {getIcon('logo-sml')}
      </picture>
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: url => dispatch(route("push", url))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logo);
