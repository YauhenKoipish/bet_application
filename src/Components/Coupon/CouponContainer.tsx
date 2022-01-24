import React from "react";
import { connect } from "react-redux";

import Main from "./";
import Coupon from "../Coupon/";
import CouponButton from "../Coupon/CouponButton";

const CouponContainer = (props: any) => {
  const { isBookmaker, match, historyRoute } = props;

  if (historyRoute[historyRoute.length - 1].includes("currentRates"))
    return <></>;
  return (
    <>
      <Coupon />
      <CouponButton />
    </>
  );
};

const mapStateToProps = state => {
  return {
    searchData: state.search.data,
    historyRoute: state.history,
    sattingApp: state.mainSetting,
    isBookmaker: state.isBookmaker
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CouponContainer);
