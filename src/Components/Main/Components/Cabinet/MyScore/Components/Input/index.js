import React from "react";
import { connect } from "react-redux";
import Chanels from "../Chanels/";
import {
  requestReplenishmentChannels,
  requestReplenishment
} from "../../../../../../../Server/";

const mapStateToProps = state => {
  return {
    stateConnection: state.cupis.replenishment.stateConnection,
    chanels: state.cupis.replenishment.chanels,
    isPermission: state.verification.ident.isCanTopup,
    lang: state.user.language_user.dict
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(props => (
  <Chanels
    key="input"
    {...props}
    nameClickButton={props.lang.topUp}
    requstChanels={requestReplenishmentChannels}
    handleClickButton={(sum, channel) =>
      requestReplenishment({
        channel,
        sum
      })
    }
  />
));
