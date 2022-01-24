import React from "react";
import Img1 from "./img/1.png";
import Img2 from "./img/2.png";
import Img3 from "./img/3.png";
import Img4 from "./img/4.png";
import Img5 from "./img/5.png";
import Img6 from "./img/6.png";
import Img7 from "./img/7.png";
import Img8 from "./img/8.png";
import Img9 from "./img/9.png";
// import "./style/offerings.css";
import { connect } from "react-redux";
import { route } from "../../../Actions/Components/Navigation/";

import { routsName } from "../../../Router/RouterList";
const Offerings = props => (
    <div className="offerings">
        <div className="offerings__header">
            <span>{props.lang.stockAndOffer}</span>
        </div>
        <div className="offerings__content">
            <div className="offerings__item">
                <div
                    className="offerings__img"
                    onClick={() =>
                        props.navigate("/" + routsName.dict.offer + "/" + 1)
                    }
                >
                    <img src={Img1} alt="Акция" />
                </div>
            </div>

            <div className="offerings__item">
                <div
                    className="offerings__img"
                    onClick={() =>
                        props.navigate("/" + routsName.dict.offer + "/" + 2)
                    }
                >
                    <img src={Img2} alt="Акция" />
                </div>
            </div>

            <>
                <div className="offerings__item">
                    <div
                        className="offerings__img"
                        onClick={() =>
                            props.navigate("/" + routsName.dict.offer + "/" + 3)
                        }
                    >
                        <img src={Img3} alt="Акция" />
                    </div>
                </div>

                <div className="offerings__item">
                    <div
                        className="offerings__img"
                        onClick={() =>
                            props.navigate("/" + routsName.dict.offer + "/" + 4)
                        }
                    >
                        <img src={Img4} alt="Акция" />
                    </div>
                </div>
                <div
                    className="offerings__item"
                    onClick={() =>
                        props.navigate("/" + routsName.dict.offer + "/" + 5)
                    }
                >
                    <div className="offerings__img">
                        <img src={Img5} alt="Акция" />
                    </div>
                </div>
                <div className="offerings__item">
                    <div
                        className="offerings__img"
                        onClick={() =>
                            props.navigate("/" + routsName.dict.offer + "/" + 6)
                        }
                    >
                        <img src={Img6} alt="Акция" />
                    </div>
                </div>
            </>

            <div className="offerings__item">
                <div
                    className="offerings__img"
                    onClick={() =>
                        props.navigate("/" + routsName.dict.offer + "/" + 7)
                    }
                >
                    <img src={Img7} alt="Акция" />
                </div>
            </div>

            <div className="offerings__item">
                <div
                    className="offerings__img"
                    onClick={() =>
                        props.navigate("/" + routsName.dict.offer + "/" + 8)
                    }
                >
                    <img src={Img8} alt="Акция" />
                </div>
            </div>

            <div className="offerings__item">
                <div
                    className="offerings__img"
                    onClick={() =>
                        props.navigate("/" + routsName.dict.offer + "/" + 9)
                    }
                >
                    <img src={Img9} alt="Акция" />
                </div>
            </div>
        </div>
    </div>
);

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
)(Offerings);
