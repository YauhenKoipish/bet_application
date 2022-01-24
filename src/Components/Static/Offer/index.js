import React, { Component } from "react";
import Text1 from "./Components/Texts/Text1";
import Text2 from "./Components/Texts/Text2";
import Text3 from "./Components/Texts/Text3";
import Text4 from "./Components/Texts/Text4";
import Text5 from "./Components/Texts/Text5";
import Text6 from "./Components/Texts/Text6";
import Text7 from "./Components/Texts/Text7";
import Text8 from "./Components/Texts/Text8";
import Text9 from "./Components/Texts/Text9";
import Img1 from "./img/1.png";
import ImgBig1 from "./img/1-big.png";
import Img2 from "./img/2.png";
import ImgBig2 from "./img/2-big.png";
import Img3 from "./img/3.png";
import ImgBig3 from "./img/3-big.png";
import Img4 from "./img/4.png";
import ImgBig4 from "./img/4-big.png";
import Img5 from "./img/5.png";
import ImgBig5 from "./img/5-big.png";
import Img6 from "./img/6.png";
import ImgBig6 from "./img/6-big.png";
import Img7 from "./img/7.png";
import ImgBig7 from "./img/7-big.png";
import Img8 from "./img/8.png";
import ImgBig8 from "./img/8-big.png";
import Img9 from "./img/9.png";
import ImgBig9 from "./img/9-big.png";
// import "./style/offer.css";
import { route } from "../../../Actions/Components/Navigation/";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { routsName } from "../../../Router/RouterList";

class Offer extends Component {
    constructor(props) {
        super(props);
        this.isTransitionNone = true;
        this.offers = [
            {
                img: Img1,
                imgBig: ImgBig1,
                text: props => (
                    <Text1 {...props} lang={this.props.lang} key={props.key} />
                )
            },
            {
                img: Img2,
                imgBig: ImgBig2,
                text: props => (
                    <Text2 {...props} lang={this.props.lang} key={props.key} />
                )
            },
            {
                img: Img3,
                imgBig: ImgBig3,
                text: props => (
                    <Text3 {...props} lang={this.props.lang} key={props.key} />
                )
            },
            {
                img: Img4,
                imgBig: ImgBig4,
                text: props => (
                    <Text4 {...props} lang={this.props.lang} key={props.key} />
                )
            },
            {
                img: Img5,
                imgBig: ImgBig5,
                text: props => (
                    <Text5 {...props} lang={this.props.lang} key={props.key} />
                )
            },
            {
                img: Img6,
                imgBig: ImgBig6,
                text: props => (
                    <Text6 {...props} lang={this.props.lang} key={props.key} />
                )
            },
            {
                img: Img7,
                imgBig: ImgBig7,
                text: props => (
                    <Text7 {...props} lang={this.props.lang} key={props.key} />
                )
            },
            {
                img: Img8,
                imgBig: ImgBig8,
                text: props => (
                    <Text8 {...props} lang={this.props.lang} key={props.key} />
                )
            },
            {
                img: Img9,
                imgBig: ImgBig9,
                text: props => (
                    <Text9 {...props} lang={this.props.lang} key={props.key} />
                )
            }
        ];
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.containerElem = React.createRef();
        this.setInitialTransform = this.setInitialTransform.bind(this);
        this.offerElem = React.createRef();
        this.state = {
            active: +this.props.match.params.num,
            transformVal: null,
            startTouch: null,
            shift: null
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state !== nextState) {
            return true;
        }
        if (this.props.lang !== nextProps.lang) {
            return true;
        }
        return false;
    }

    getTransformVal(lvl) {
        const w = document.querySelector(".offer").offsetWidth;
        return -(lvl - 1) * w;
    }

    setInitialTransform() {
        this.setState({
            ...this.state,
            transformVal: this.getTransformVal(this.state.active),
            startTouch: null,
            shift: null
        });
    }

    setInitialValues() {
        window.addEventListener("resize", this.setInitialTransform);
        this.containerElem.current.addEventListener(
            "touchstart",
            this.handleTouchStart,
            false
        );
        this.containerElem.current.addEventListener(
            "touchend",
            this.handleTouchEnd,
            false
        );
        this.containerElem.current.addEventListener(
            "touchmove",
            this.handleTouchMove,
            false
        );
        this.setInitialTransform();
    }

    setNextOffer() {
        this.props.navigate(
            "/" + routsName.dict.offer + "/" + (this.state.active + 1)
        );
        this.setState({
            ...this.state,
            active: this.state.active + 1,
            transformVal: this.getTransformVal(this.state.active + 1),
            startTouch: null,
            shift: null
        });
    }

    setPrevOffer() {
        this.props.navigate(
            "/" + routsName.dict.offer + "/" + (this.state.active - 1)
        );
        this.setState({
            ...this.state,
            active: this.state.active - 1,
            transformVal: this.getTransformVal(this.state.active - 1),
            startTouch: null,
            shift: null
        });
    }

    getStyleForText(lvl) {
        if (lvl !== this.state.active) {
            return {
                opacity: 0,
                display: "none"
            };
        }
        return {
            opacity: 1
        };
    }

    getCoordTouch(e) {
        const touch = e.changedTouches[0];
        return {
            x: touch.clientX,
            y: touch.clientY
        };
    }

    handleTouchMove(event) {
        const coords = this.getCoordTouch(event);
        let shift = coords.x - this.state.startTouch;
        if (shift < 0 && this.state.active === this.offers.length) {
            shift = 0;
        }
        if (shift > 0 && this.state.active === 1) {
            shift = 0;
        }
        this.setState({
            ...this.state,
            shift
        });
    }

    handleTouchStart(event) {
        const coords = this.getCoordTouch(event);
        // this.containerElem.current.classList.add("transition0");
        this.setState({
            ...this.state,
            startTouch: coords.x
        });
    }

    handleTouchEnd(event) {
        // this.containerElem.current.classList.remove("transition0");
        if (this.state.shift > 20) {
            this.setPrevOffer();
        } else if (this.state.shift < -20) {
            this.setNextOffer();
        } else {
            this.setInitialTransform();
        }
    }

    redirect() {
        this.setState({
            ...this.state,
            active: 1
        });
        return <Redirect to={"/" + routsName.dict.offer + "/1"} />;
    }

    render() {
        if (!this.offers[this.state.active - 1]) return this.redirect();
        const transformVal =
            this.state.transformVal !== null
                ? this.state.shift
                    ? this.state.transformVal + this.state.shift
                    : this.state.transformVal
                : 0;

        return (
            <div className="offer" ref={this.offerElem}>
                <div className="offer__header">
                    <div
                        className={
                            "offer__pics " +
                            (this.isTransitionNone ||
                            this.state.startTouch !== null
                                ? "transition0"
                                : "")
                        }
                        style={{
                            transform: "translateX(" + transformVal + "px)"
                        }}
                        ref={this.containerElem}
                    >
                        {this.offers.map((offer, i) => {
                            return (
                                <div className="offer__img" key={i}>
                                    <picture>
                                        <source
                                            media="(min-width: 600px)"
                                            srcSet={offer.imgBig}
                                        />
                                        <img src={offer.img} />
                                    </picture>
                                </div>
                            );
                        })}
                    </div>
                    {this.state.active > 1 ? (
                        <div
                            className="offer__toggle-left"
                            onClick={this.setPrevOffer.bind(this)}
                        />
                    ) : (
                        ""
                    )}
                    {this.state.active < this.offers.length ? (
                        <div
                            className="offer__toggle-right"
                            onClick={this.setNextOffer.bind(this)}
                        />
                    ) : (
                        ""
                    )}
                </div>

                <div className="offer__main">
                    {this.offers.map((offer, i) => {
                        return offer.text({
                            key: i,
                            style: this.getStyleForText(i + 1)
                        });
                    })}
                </div>
            </div>
        );
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.setInitialTransform);
        this.containerElem.current.removeEventListener(
            "touchstart",
            this.handleTouchStart,
            false
        );
        this.containerElem.current.removeEventListener(
            "touchmove",
            this.handleTouchMove,
            false
        );
        this.containerElem.current.removeEventListener(
            "touchend",
            this.handleTouchEnd,
            false
        );
    }

    componentDidMount() {
        if (this.offers[this.state.active - 1]) this.setInitialValues();
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            !this.offers[prevState.active - 1] &&
            this.offers[this.state.active - 1]
        ) {
            this.setInitialValues();
        }
        if (
            this.state.transformVal !== null &&
            prevState.transformVal === null
        ) {
            this.isTransitionNone = false;
        }
    }
}

const mapStateToProps = state => {
    return {
        lang: state.user.language_user.dict
    };
};
const mapDispatchToProps = dispatch => {
    return {
        navigate: url => dispatch(route("push", url))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Offer);
