import React from "react";
import start from "../Img/start.png";
import { connect } from "react-redux";
import { route } from "../../../Actions/Components/Navigation/";

export const Promo = props => {
    const changeUrl = url => {
        props.navigate(url);
    };

    return (
        <div className="tv__start tv-start">
            <div className="tv-start__main-pic">
                <img src={start} alt="" />
            </div>

            <div className="tv-start__text">
                <p>
                    Добро пожаловать в Abet! <br />
                    Мы дарим вам фрибет 500 рублей без условий. <br />У нас вы
                    получите безлимитный бонус на депозит на старте!
                </p>
            </div>

            <div className="tv-start__button">
                <button onClick={() => changeUrl("/login/registration")}>
                    Зарегистрироваться
                </button>
            </div>

            <div className="tv-start__info">
                <p>
                    БК – российская букмекерская компания, оказывающая услуги на
                    основании лицензии №19 ФНС РФ, выданной 28.07.2011.
                    Фирменное наименование: Общество с ограниченной
                    ответственностью , Товарный знак: .
                </p>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: url => dispatch(route("push", url))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Promo);
