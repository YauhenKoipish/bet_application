import React from "react";
import { connect } from "react-redux";

import Footerсomponents from "./Components/footer";

const Footer = props => {
  return (
    <footer>
      <Footerсomponents route={props} />
    </footer>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    lang: state.user.language_user.dict
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
