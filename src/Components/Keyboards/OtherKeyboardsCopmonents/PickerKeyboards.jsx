import React from "react";

export default function PickerKeyboards(props) {
    return (
        <>
            <div className="main">
                {!props.array ? (
                    "Авторизуйтесь либо нет максимума"
                ) : (
                    <>
                        <div className="button">Up</div>
                        <div className="courusel">
                            <ul>
                                {props.array.map((elem, index) => (
                                    <li
                                        className="coursel"
                                        key={index}
                                        onClick={() => props.selectFunc(elem)}
                                    >
                                        {elem}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="button">down</div>
                    </>
                )}
            </div>

            <div className="submit" onClick={() => props.accepFunc()}>
                Принять
            </div>
        </>
    );
}
/** <div className="linevariants">
                {[
                    1,
                    2,
                    3,
                    3,
                    4,
                    54,
                    5,
                    6,
                    67,
                    123,
                    8,
                    ,
                    9,
                    8,
                    7,
                    65,
                    53,
                    23,
                    5,
                    235,
                    23,
                    523,
                    5,
                    235,
                    23,
                    523,
                    5,
                    235,
                    23,
                    5,
                    235,
                    23,
                    5
                ].map((item, index) => (
                    <div className="smlBets" key={index}>
                        {item}
                    </div>
                ))}
            </div>  */
