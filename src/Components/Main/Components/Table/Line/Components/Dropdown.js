import React from "react";
import { heightOneCellLineWithSpecifier } from "../../../../../../Services/Shared";

export function DropdownTotal(props) {
    const {
        lines,
        arrows,
        activeSpecifier,
        activeIndexSpec,
        isOpen,
        toggleDropDown,
        changeActiveSpecIndex
    } = props;
    return (
        <div
            className={
                "line__coef line__coef--dropdown" + (isOpen ? " open" : "")
            }
            onClick={toggleDropDown.bind(this, activeSpecifier, lines)}
        >
            <span>{activeSpecifier.specifierValue}</span>

            <span className="line__img">
                {lines.length > 1 ? <img src={arrows} alt="" /> : ""}
            </span>

            <ul
                className="line__dropdowm dropdown"
                style={{
                    top:
                        -heightOneCellLineWithSpecifier * activeIndexSpec + "px"
                }}
            >
                {lines.map((line, i) =>
                    activeIndexSpec !== i ? (
                        <li
                            className="dropdowm__elem"
                            key={i}
                            onClick={e =>
                                changeActiveSpecIndex(line.specifierValue[0], e)
                            }
                        >
                            {line.specifierValue}
                        </li>
                    ) : (
                        <li className="dropdowm__elem active" key={i}>
                            {activeSpecifier.specifierValue}
                        </li>
                    )
                )}
            </ul>
        </div>
    );
}
export function DropdownHandicap(props) {
    const {
        lines,
        activeSpecifier,
        activeIndexSpec,
        isOpen,
        toggleDropDown,
        changeActiveSpecIndex
    } = props;
    return (
        <div
            className={
                "line__coef line__coef--dropdown" +
                (isOpen ? " open " : " ") +
                getClassPlusOrMinus(activeSpecifier.specifierValue)
            }
            onClick={toggleDropDown.bind(this, activeSpecifier, lines)}
        >
            <span>{getFormattedSpec(activeSpecifier.specifierValue)}</span>

            <ul
                className="line__dropdowm dropdown"
                style={{
                    top:
                        -heightOneCellLineWithSpecifier * activeIndexSpec + "px"
                }}
            >
                {lines.map((line, i) =>
                    activeIndexSpec !== i ? (
                        <li
                            className={
                                "dropdowm__elem " +
                                getClassPlusOrMinus(line.specifierValue)
                            }
                            key={i}
                            onClick={e =>
                                changeActiveSpecIndex(line.specifierValue[0], e)
                            }
                        >
                            {getFormattedSpec(line.specifierValue)}
                        </li>
                    ) : (
                        <li
                            className={
                                "dropdowm__elem active " +
                                getClassPlusOrMinus(
                                    activeSpecifier.specifierValue
                                )
                            }
                            key={i}
                        >
                            {getFormattedSpec(activeSpecifier.specifierValue)}
                        </li>
                    )
                )}
            </ul>
        </div>
    );
}

const getFormattedSpec = value => {
    return value.toString().replace(/\+|\-/g, "");
};

const getClassPlusOrMinus = value => {
    if (parseFloat(value) >= 0) return "plus-minus";
    else return "minus-plus";
};
