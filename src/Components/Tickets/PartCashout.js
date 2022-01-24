import React, { Component } from "react";
import { splitRangNumber, validateInput } from "../../Services/Shared";
import { connect } from "react-redux";
import Loading from "../Loading/";

class PartCashout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sum: props.cashout / 2,
            percent: this.getPercent(props.cashout / 2)
        };
        this.lineElem = React.createRef();
        this.inputElem = React.createRef();
        this.handleMoveRange = e => this.moveRange.call(this, e);
    }

    moveRange(e) {
        const coordsElem = this.getCoordsElem();
        const coordsTouch = this.getCoordTouch(e);
        const width = this.getWidth(coordsElem, coordsTouch);
        const sum = this.getSumByPercent(width);
        this.setState({
            sum,
            percent: width
        });
        this.inputElem.current.value = splitRangNumber(sum);
    }

    getCoordTouch(e) {
        const touch = e.changedTouches[0];
        return {
            left: touch.clientX
        };
    }

    getWidth(coordsElem, coordsTouch) {
        let width =
            ((coordsTouch.left - coordsElem.left) /
                (coordsElem.right - coordsElem.left)) *
            100;
        if (width > 100) width = 100;
        if (width < 0) width = 0;
        return width;
    }

    getCoordsElem() {
        const box = this.lineElem.current.getBoundingClientRect();
        return {
            right: box.right,
            left: box.left
        };
    }

    getSumByPercent(percent) {
        return Math.floor((this.props.cashout * percent) / 100);
    }

    getPercent(sum) {
        return (sum / this.props.cashout) * 100;
    }

    changeSum(sum) {
        if (sum !== this.state.sum) {
            this.setState({
                sum,
                percent: this.getPercent(sum)
            });
        }
    }

    checkIsSumInputCorrect(elem) {
        let value = +this.inputElem.current.value.replace(/ /g, "");
        if (value > this.props.cashout) {
            value = Math.floor(this.props.cashout);
            // this.inputElem.current.value = splitRangNumber(value);
            this.changeSum(value);
            return false;
        }
        return true;
    }

    changeSumByInput(e) {
        validateInput(e.target, splitRangNumber);
        let value = +e.target.value.replace(/ /g, "");
        const isSumCorrect = this.checkIsSumInputCorrect(e.target);
        if (isSumCorrect) this.changeSum(value);
    }

    shouldComponentUpdate(nextProps) {
        if (
            nextProps.preloader &&
            !this.props.preloader &&
            nextProps.preloader.ticketId !== this.props.ticketId
        )
            return false;
        return true;
    }

    render() {
        const { sum, percent } = this.state;
        const isPreloader =
            this.props.preloader &&
            this.props.preloader.type === "partCashout" &&
            this.props.preloader.ticketId === this.props.ticketId
                ? true
                : false;

        return (
            <div className="bets__modal-cashout modal-cashout">
                <div className="modal-cashout__modal">
                    <div className="modal-cashout__header">
                        <div className="modal-cashout__title">
                            {this.props.lang.partChasOut}
                        </div>
                    </div>

                    <div className="modal-cashout__main">
                        <div className="modal-cashout__text">
                            <span>{this.props.lang.sumOut}</span>
                        </div>
                        <div className="modal-cashout__range">
                            <div className="modal-cashout__main-line" />
                            <div
                                className="modal-cashout__mask"
                                ref={this.lineElem}
                            />
                            <div
                                className="modal-cashout__grow-line"
                                style={{ width: percent + "%" }}
                            >
                                <div className="modal-cashout__toggle" />
                            </div>
                        </div>

                        <div className="modal-cashout__quantity">
                            <div className="modal-cashout__min">0</div>
                            <div className="modal-cashout__custom">
                                <input
                                    ref={this.inputElem}
                                    type="text"
                                    onChange={this.changeSumByInput.bind(this)}
                                    value={splitRangNumber(Math.floor(sum))}
                                />
                            </div>
                        </div>

                        <div className="modal-cashout__button">
                            {isPreloader ? (
                                <button>
                                    <Loading />
                                </button>
                            ) : (
                                <button
                                    onClick={() =>
                                        this.props.handleClickPartCashout(sum)
                                    }
                                >
                                    {this.props.lang.chashout}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        // this.inputElem.current.oninput = this.changeSumByInput.bind(this);
        this.lineElem.current.addEventListener(
            "touchstart",
            this.handleMoveRange,
            false
        );
        this.lineElem.current.addEventListener(
            "touchmove",
            this.handleMoveRange,
            false
        );
    }

    componentDidUpdate(prevProps) {
        this.checkIsSumInputCorrect();
        if (
            prevProps.preloader &&
            !this.props.preloader &&
            prevProps.preloader.ticketId === this.props.ticketId
        )
            this.props.closePartCashout();
    }

    componentWillUnmount() {
        this.lineElem.current.removeEventListener(
            "touchstart",
            this.handleMoveRange
        );
        this.lineElem.current.removeEventListener(
            "touchmove",
            this.handleMoveRange
        );
    }
}

const mapStateToProps = state => {
    return {
        preloader: state.tickets.preloader,
        lang: state.user.language_user.dict
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps)(PartCashout);
