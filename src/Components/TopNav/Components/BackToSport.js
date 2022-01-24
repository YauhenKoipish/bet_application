import React from "react";
import { getSportByName } from "../../../Services/Shared";
import { connect } from "react-redux";
import { route } from "../../../Actions/Components/Navigation/";

import { routsName } from "../../../Router/RouterList";

const BackToSport = props => {
  const { Arrow, parentProps, sports } = props;
  const sport = getSportByName(sports, parentProps.match.params.sport);
  const goBackToSport = () => {
    props.navigate(
      routsName.getRoutsUrl(routsName.dictcategories) +
        "/" +
        parentProps.match.params.sport
    );
  };
  return (
    <React.Fragment>
      {sport ? (
        <div className="top-nav__nav" onClick={goBackToSport}>
          <div className="top-nav__arrow">
            <Arrow />
          </div>
          <div className="top-nav__name">{sport.name}</div>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
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
)(BackToSport);
