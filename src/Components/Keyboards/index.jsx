import React, { Component } from "react";
import PickerKeyboards from "./OtherKeyboardsCopmonents/PickerKeyboards";

import InputSum from "./Moduls/inputSum";
import Fastbet from "./Moduls/fastbet";

export default class Keyboard extends Component {
    constructor(props) {
        super(props);
        this.valueKeyboards = React.createRef();
        this.tochPlace = React.createRef();
        this.xDown = null;
        this.yDown = null;
        this.elem = null;
        this.state = {
            funcwriteValue: "",
            elem: props.elem,
            curentValue: "",
            slideKeyboard: false
        };
    }

    setvalue = (value, e) => {
        e.persist();

        e.target.classList.add("fade");
        const newState = { ...this.state };
        setTimeout(() => {
            e.target.classList.remove("fade");
        }, 400);

        newState.curentValue = this.props.elem.current.textContent + value;
        this.valueKeyboards.current.textContent = newState.curentValue;
        this.props.elem.current.textContent = newState.curentValue;

        this.setState(newState);
    };

    setFullvalue(value) {
        const newState = { ...this.state };
        newState.curentValue = value;
        this.valueKeyboards.current.textContent = value;
        this.props.elem.current.textContent = value;
        this.setState(newState);
    }

    handleTouchStart(event) {
        this.initialPoint = event.changedTouches[0];
    }

    handleTouchEnd(event) {
        this.finalPoint = event.changedTouches[0];
        const xAbs = Math.abs(this.initialPoint.pageX - this.finalPoint.pageX);
        const yAbs = Math.abs(this.initialPoint.pageY - this.finalPoint.pageY);
        if (xAbs > 100 || yAbs > 100) {
            if (xAbs > yAbs) {
                if (this.finalPoint.pageX < this.initialPoint.pageX) {
                    this.setState({
                        ...this.state,
                        slideKeyboard: true
                    });
                } else {
                    this.setState({
                        ...this.state,
                        slideKeyboard: false
                    });
                }
            } else {
                if (this.finalPoint.pageY < this.initialPoint.pageY) {
                    console.log("top");
                } else {
                    this.props.close();
                }
            }
        }
    }

    getTouches(event) {
        return event.touches || event.originalEvent.touches;
    }

    removeElem() {
        const newState = { ...this.state };
        newState.curentValue = this.state.curentValue.substring(
            0,
            this.state.curentValue.length - 1
        );
        this.valueKeyboards.current.textContent = newState.curentValue;
        this.props.elem.current.textContent = newState.curentValue;
        this.setState(newState);
    }

    render() {
        return (
            <div
                className={
                    "keyboard " +
                    (this.props.bigKeyboards ? "three_show" : this.props.device)
                }
                id="keyboard__event_id"
            >
                <div className="title">
                    <InputSum
                        refElement={this.valueKeyboards}
                        curentValue={this.state.curentValue}
                    />
                    {this.props.arraySum && !this.props.bigKeyboards ? (
                        <Fastbet
                            array={this.props.arraySum}
                            callback={this.setFullvalue.bind(this)}
                        />
                    ) : this.props.bigKeyboards ? (
                        ""
                    ) : (
                        "Не авторизован"
                    )}
                </div>
                <div className="keyboards__container" ref={this.tochPlace}>
                    <div
                        className={
                            "main_number flex" +
                            (this.state.slideKeyboard ? " slideLeft" : "")
                        }
                    >
                        <ul>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
                                <li
                                    className="number"
                                    key={number}
                                    onClick={e => this.setvalue(number, e)}
                                >
                                    {number}
                                </li>
                            ))}
                            <li
                                className="number duble"
                                onClick={e => this.setvalue(0, e)}
                            >
                                0
                            </li>
                            <li
                                className="number"
                                onClick={e => this.setvalue(".", e)}
                            >
                                ,
                            </li>
                        </ul>
                        <div className="sub_Button">
                            <div
                                className="remove"
                                onClick={() => this.removeElem()}
                            >
                                X
                            </div>
                            <div
                                className="accept"
                                onClick={() => this.props.close()}
                            >
                                ok
                            </div>
                        </div>
                    </div>

                    <div className="pickerKeyboards">
                        <PickerKeyboards
                            array={this.props.arraySum}
                            selectFunc={this.setvalue.bind(this)}
                            accepFunc={this.props.close}
                        />
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        if (!this.props.bigKeyboards) {
            this.tochPlace.current.addEventListener(
                "touchstart",
                this.handleTouchStart.bind(this),
                false
            );
            // document.addEventListener(
            //     "touchmove",
            //     this.handleTouchMove.bind(this),
            //     false
            // );
            this.tochPlace.current.addEventListener(
                "touchend",
                this.handleTouchEnd.bind(this),
                false
            );
        }
    }
}
