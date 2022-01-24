import React from "react";
import { getSportIcon } from "../../../../../../Services/Shared";

const FilterLine = props => {
    const tmp = getTmp(props.active);
    return (
        <div
            className={"filter__type" + (props.isOpen ? " open" : "")}
            onClick={props.toggle}
        >
            {tmp(props.lang)}
            {props.variants.length !== 0 ? (
                <div className="filter__arrows">
                    {getSportIcon("arrowsUpDown")}
                </div>
            ) : (
                ""
            )}

            {getDropDown(props, props.lang)}
        </div>
    );
};

const getTmp = val => {
    switch (val) {
        case "total":
            return tmpTotal;
        case "handicap":
            return tmpHandicap;
        case "1x2":
        default:
            return tmp1x2;
    }
};

const getDropDown = (props, lang) => {
    return (
        <ul className="filter__dropdowm dropdown">
            {props.variants.map((v, i) => {
                return getTmpDropdown(
                    getChangeFilterFunc(() => props.changeFilter(v), v),
                    getTmp(v),
                    i,
                    lang
                );
            })}
        </ul>
    );
};

const changeFilterFunc = (e, changeFilter) => {
    e.stopPropagation();
    changeFilter();
};

const getChangeFilterFunc = (changeFilter, val) => {
    return () => changeFilter(val);
};

const getTmpDropdown = (changeFilter, tmp, key, lang) => {
    return (
        <li
            className="dropdowm__elem"
            onClick={e => changeFilterFunc(e, changeFilter)}
            key={key}
        >
            {tmp(lang)}
        </li>
    );
};

const tmp1x2 = lang => {
    return (
        <React.Fragment>
            <div className="filter__elem">{lang.homeNumb}</div>
            <div className="filter__elem">{lang.shortDraw}</div>
            <div className="filter__elem two">{lang.awayNumb}</div>
        </React.Fragment>
    );
};

const tmpTotal = lang => {
    return (
        <React.Fragment>
            <div className="filter__elem">{lang.superShortOver}</div>
            <div className="filter__elem">{lang.totalFilt}</div>
            <div className="filter__elem two">{lang.superShortUnder}</div>
        </React.Fragment>
    );
};

const tmpHandicap = lang => {
    return <div className="filter__elem two">{lang.fora}</div>;
};

export default FilterLine;
