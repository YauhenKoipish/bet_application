import React from "react";
import { connect } from "react-redux";
import Chanels from "../Chanels/";

import {
  requestWithdrawalChannels,
  requestWithdrawal
} from "../../../../../../../Server/";

const mapStateToProps = state => {
  return {
    stateConnection: state.cupis.withdrawal.stateConnection,
    chanels: state.cupis.withdrawal.chanels,
    isPermission: state.verification.ident.isCanWithdraw,
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
    key="output"
    {...props}
    nameClickButton={props.lang.pin}
    requstChanels={requestWithdrawalChannels}
    handleClickButton={(sum, channel) =>
      requestWithdrawal({
        channel,
        sum
      })
    }
  />
));
