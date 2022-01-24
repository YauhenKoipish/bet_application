import React from "react";
import { getSportIcon } from "../../../../../Services/Shared";
export default function TitleCoupion(state) {
    return (
        <div className="coupon__title" onClick={() => state.toggle()}>
            <div className="coupon__multibet">{state.name}</div>
            {state.show ? (
                <span className="country_ordinars">{state.sizeValue}</span>
            ) : (
                ""
            )}
            <div
                className={"coupon__open " + (!state.isOpen ? "transform" : "")}
            >
                {getSportIcon("arrow")}
            </div>
        </div>
    );
}
