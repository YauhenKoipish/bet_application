import React from "react";
import CreateLine from "./CreateLine";

import arrow from "../img/arrow.svg";
import fav from "../img/fav.svg";
import favFill from "../img/favourite-fill.svg";
import { getIcon } from "../../../../../../Services/Shared";

const arrowsTmp = (func, keyMarket, name) => {
  return (
    <div className="painting__arrow " onClick={() => func(keyMarket, name)}>
      {getIcon("arrow")}
    </div>
  );
};

const getTabInformation = (
  mapTab,
  tab,
  event,
  markets,
  arrows = null,
  closeMarket,
  marketsHide,
  marketsByNum,
  dispatchToggle,
  coupon,
  favMarkets,
  marketsFavArray
) => {
  // debugger;
  const valueMap = mapTab.get(tab);
  return [...valueMap.lines.keys()].map((item, k) => {
    const marketId = valueMap.lines.get(item)[0].marketId;
    return (
      <div
        className={
          "painting__elem " + (marketsHide.includes(item) ? "close" : "")
        }
        key={k}
      >
        <div className="painting__name">
          <div className="painting__fav" onClick={() => favMarkets(marketId)}>
            {getIcon(!marketsFavArray.includes(marketId) ? "fav" : "favFill")}{" "}
          </div>
          <div className="painting__text">
            {item} marketId : {marketId}
          </div>
          {/* <div className='painting__view'>
                        <img src={table} alt='' />
                    </div> */}
          {arrowsTmp(closeMarket, item, valueMap.lines)}
        </div>

        {valueMap.lines.get(item)[0].matrix !== undefined ? (
          <CreateLine
            lines={[...valueMap.lines.get(item).values()]}
            event={event}
            markets={markets}
            marketsByNum={marketsByNum}
            dispatchToggle={dispatchToggle}
            coupon={coupon}
          />
        ) : (
          ""
        )}
      </div>
    );
  });
};

const getTitlePainting = (
  tab,
  key,
  event,
  markets,
  arrows = false,
  closeMain,
  closeMarket,
  marketsHide = [],
  marketsByNum,
  dispatchToggle,
  coupon,
  favMarkets,
  marketsFavArray
) => {
  if (key == "main") key = "all";

  if (key == "counstructor") return "";
  // debugger;

  return (
    <div
      className={
        !tab.get(key).opend ? " painting__type close" : "painting__type"
      }
    >
      <div className="painting__header">
        <div className="painting__title">{tab.get(key).rusName}</div>
        {arrows ? arrowsTmp(closeMain, key, tab.get(key)) : ""}
      </div>
      {getTabInformation(
        tab,
        key,
        event,
        markets,
        null,
        closeMarket,
        marketsHide,
        marketsByNum,
        dispatchToggle,
        coupon,
        favMarkets,
        marketsFavArray
      )}
    </div>
  );
};

const MarketGroup = props => {
  // debugger;
  if (!props.tabLines.has(props.activeTab)) {
    props.changeTab("all");
    return "";
  }
  return (
    <React.Fragment>
      {props.activeTab == "all"
        ? [...props.tabLines.keys()].map((item, k) => {
            if (item == "combiner") {
              return "";
            }
            return (
              <React.Fragment key={k}>
                {item == "all"
                  ? ""
                  : getTitlePainting(
                      props.tabLines,
                      item,
                      props.event,
                      props.markets,
                      true,
                      props.changeViewMainBlock,
                      props.changeViewBlock,
                      props.marketsHide,
                      props.marketsByNum,
                      props.dispatchToggle,
                      props.coupon,
                      props.favMarkets,
                      props.marketsFavArray
                    )}
              </React.Fragment>
            );
          })
        : getTitlePainting(
            props.tabLines,
            props.activeTab,
            props.event,
            props.markets,
            false,
            props.changeViewMainBlock,
            props.changeViewBlock,
            props.marketsHide,
            props.marketsByNum,
            props.dispatchToggle,
            props.coupon,
            props.favMarkets,
            props.marketsFavArray
          )}
    </React.Fragment>
  );
};

export default MarketGroup;
