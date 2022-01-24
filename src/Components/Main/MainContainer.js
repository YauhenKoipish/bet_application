import React from "react";
import { connect } from "react-redux";
import SearchResults from "./Components/Search/";
import Main from "./";
import Coupon from "../Coupon/Components/Coupon";
import CouponButton from "../Coupon/CouponButton";

const MainContainer = props => {
  const { isBookmaker, match } = props;
  if (props.searchData) return <SearchResults search={props.searchData} />;
  return (
    <>
      <Main
        historyRoute={props.historyRoute}
        setting={props.sattingApp}
        isBookmaker={isBookmaker}
      />
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

export default connect(mapStateToProps)(MainContainer);
