import React from "react";
import { connect } from "react-redux";
import { openCoupon } from "../../Actions/Components/Coupon/";
import { getIcon } from "../../Services/Shared";

const CouponButton = (props: any) => {
  // let inputEl = React.useRef(null);

  const getCount = () => {
    return props.builder ? props.ordinars.length + 1 : props.ordinars.length;
  };
  if (props.isOpen || props.isCouponOpenDefault) return "";
  const count = getCount();

  return (
    <div className="flex coupon-open jsf-bet" onClick={props.openCoupon}>
      <div className="itm">
        <span>betSlip </span>
        {count > 0 ? <div className="coupon-open__quantity">{count}</div> : ""}
      </div>
      <div className="itm">Open Bets</div>
      <div className="itm">
        <div className="itmIconContainer">{getIcon("setting")}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isOpen: state.coupon.isOpen,
    isCouponOpenDefault: state.coupon.defaultOpen,
    ordinars: state.coupon.ordinars,
    builder: state.coupon.couponBuilder
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    openCoupon: () => dispatch(openCoupon())
  };
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps
)(CouponButton as any);
