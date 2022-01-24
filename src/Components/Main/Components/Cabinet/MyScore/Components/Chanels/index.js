import React, { Component } from "react";
import { ReactComponent as Beeline } from "../../../img/user-replenishment/beeline.svg";
import { ReactComponent as BeelineFill } from "../../../img/user-replenishment/beeline-fill.svg";
import { ReactComponent as Cards } from "../../../img/user-replenishment/cards.svg";
import { ReactComponent as CardsFill } from "../../../img/user-replenishment/cards-fill.svg";
import { ReactComponent as Cupis } from "../../../img/user-replenishment/cupis.svg";
import { ReactComponent as CupisFill } from "../../../img/user-replenishment/cupis-fill.svg";
import { ReactComponent as Megafon } from "../../../img/user-replenishment/megafon.svg";
import { ReactComponent as MegafonFill } from "../../../img/user-replenishment/megafon-fill.svg";
import { ReactComponent as Mts } from "../../../img/user-replenishment/mts.svg";
import { ReactComponent as MtsFill } from "../../../img/user-replenishment/mts-fill.svg";
import { ReactComponent as Qiwi } from "../../../img/user-replenishment/qiwi.svg";
import { ReactComponent as QiwiFill } from "../../../img/user-replenishment/qiwi-fill.svg";
import { ReactComponent as Tele2 } from "../../../img/user-replenishment/tele2.svg";
import { ReactComponent as Tele2Fill } from "../../../img/user-replenishment/tele2-fill.svg";
import { ReactComponent as Yandex } from "../../../img/user-replenishment/yandex.svg";
import { ReactComponent as YandexFill } from "../../../img/user-replenishment/yandex-fill.svg";
import { ReactComponent as Moneta } from "../../../img/user-replenishment/moneta.svg";
import { ReactComponent as MonetaFill } from "../../../img/user-replenishment/moneta-fill.svg";
import ReplenishmentItem from "./ReplenishmentItem";
import Info from "./Info";
import InputWithButton from "./InputWithButton";
import {
    getOnlyNumbers,
    splitRangNumber
} from "../../../../../../../Services/Shared";
import Block from "./Block";
import DocsOnCheck from "../../../Verification/Components/DocsOnCheck";
import { connect } from "react-redux";
import {
    showModal
} from "../../../../../../../Actions/Components/Modal/";

export const paymentVariants = new Map([
    ["CARD", { img: Cards, imgFill: CardsFill, name: "Банковские карты" }],
    [
        "CARD_FAIL",
        { img: Cards, imgFill: CardsFill, name: "Банковские карты FAIL" }
    ], //временно
    [
        "CARD_OK2",
        { img: Cards, imgFill: CardsFill, name: "Банковские карты OK" }
    ], // временно
    ["QIWI", { img: Qiwi, imgFill: QiwiFill, name: "QIWI Кошелек" }],
    ["YM", { img: Yandex, imgFill: YandexFill, name: "Яндекс Деньги" }],
    ["WM", { img: Cards, imgFill: CardsFill, name: "WebMoney" }], // нет
    ["MONETA", { img: Moneta, imgFill: MonetaFill, name: "Монета" }],
    ["EUROSET", { img: Cards, imgFill: CardsFill, name: "Евросеть" }], // нет
    ["SVYAZNOY", { img: Cards, imgFill: CardsFill, name: "Связной" }], // нет
    ["MEGAFON", { img: Megafon, imgFill: MegafonFill, name: "Мегафон" }],
    ["MTS", { img: Mts, imgFill: MtsFill, name: "МТС" }],
    ["BEELINE", { img: Beeline, imgFill: BeelineFill, name: "Билайн" }],
    ["TELE2", { img: Tele2, imgFill: Tele2Fill, name: "Теле2" }],
    [
        "ALFACLICK",
        { img: Cards, imgFill: CardsFill, name: "Интернет-банк Альфа-клик" }
    ], // нет
    [
        "SBERBANK",
        { img: Cards, imgFill: CardsFill, name: "Интернет-банк Сбербанка" }
    ], // нет
    [
        "BANK_ACCOUNT",
        { img: Cards, imgFill: CardsFill, name: "Банковский счет" }
    ], // нет
    ["WALLET", { img: Cupis, imgFill: CupisFill, name: "Кошелек ЦУПИС" }],
    [
        "WALLET_FAIL",
        { img: Cupis, imgFill: CupisFill, name: "Кошелек ЦУПИС FAIL" }
    ], //временно
    ["WALLET_OK", { img: Cupis, imgFill: CupisFill, name: "Кошелек ЦУПИС OK" }], //временно
    [
        "CYBERPLAT",
        { img: Cards, imgFill: CardsFill, name: "Пуш-платеж через Киберплат" }
    ], // нет
    [
        "CYBERPLAT_TINKOFF",
        { img: Cards, imgFill: CardsFill, name: "Киберплат - Тинькофф Банк" }
    ], // нет
    [
        "CYBERPLAT_POCHTABANK",
        { img: Cards, imgFill: CardsFill, name: "Киберплат - Почта Банк" }
    ], // нет
    [
        "CYBERPLAT_ROSBANK",
        { img: Cards, imgFill: CardsFill, name: "Киберплат - Росбанк" }
    ], // нет
    [
        "CYBERPLAT_SVYAZNOY",
        { img: Cards, imgFill: CardsFill, name: "Киберплат - Связной" }
    ], // нет
    [
        "CYBERPLAT_EUROSET",
        { img: Cards, imgFill: CardsFill, name: "Киберплат - Евросеть" }
    ] // нет
]);

class Chanels extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: this.getFirstActiveCard(props),
            sum: "",
            isActive:
                props.stateConnection &&
                props.stateConnection.status &&
                props.chanels &&
                props.chanels.status,
            isSendRequest: false
        };
    }

    get minSum() {
        const activeChanel = this.getActiveChanel();
        if (!activeChanel) return null;
        return activeChanel.minSum;
    }

    get maxSum() {
        const activeChanel = this.getActiveChanel();
        if (!activeChanel) return null;
        return activeChanel.maxSum;
    }

    getActiveChanel() {
        if (!this.state.active || !this.props.chanels.channels) return null;
        return this.props.chanels.channels.find(
            chanel => chanel.name === this.state.active
        );
    }

    getFirstActiveCard(props) {
        if (
            !props.chanels ||
            !props.chanels.channels ||
            props.chanels.channels.length === 0
        )
            return null;
        const availableChanels = props.chanels.channels.map(
            chanel => chanel.name
        );
        return [...paymentVariants.keys()].find(payment =>
            availableChanels.includes(payment)
        );
    }

    changeActive(val) {
        if (val !== this.state.active) {
            this.setState({
                ...this.state,
                active: val
            });
        }
    }

    handleChangeInput(event) {
        let value = event.target.value;
        value = getOnlyNumbers(value);
        value = splitRangNumber(value);
        this.setState({ ...this.state, sum: value });
    }

    handleClickButton() {
        const sum = +this.state.sum.replace(/ /g, "");
        this.props.handleClickButton(sum, this.state.active);
        this.setState({
            ...this.state,
            isLoading: true
        });
    }

    changeIsActive(props) {
        const isActive =
            props.stateConnection &&
            props.stateConnection.status &&
            props.chanels &&
            props.chanels.status;
        if (
            !this.state.isLoading &&
            (isActive !== this.state.isActive ||
                (props.chanels && !this.state.active))
        ) {
            this.setState({
                ...this.state,
                isActive,
                active: this.getFirstActiveCard(props)
            });
        } else {
            if (
                this.state.isLoading &&
                (!props.stateConnection || !props.stateConnection.status)
            ) {
                this.setState({
                    ...this.state,
                    isLoading: false
                });
                this.showFailModal();
            }
        }
    }

    showFailModal() {
        const modal = {
            text: this.props.lang.timeErrorThen
        };

        this.props.showModal(modal);
    }

    redirectForDoingPay(comment) {
        this.setState({
            ...this.state,
            isLoading: false
        });
        window.open(comment, "_blank");
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.operations !== this.props.operations) {
            const operationsArray = [...nextProps.operations.values()];
            const lastOperation = operationsArray[operationsArray.length - 1];
            if (
                this.state.isLoading &&
                lastOperation &&
                lastOperation.comment
            ) {
                this.redirectForDoingPay(lastOperation.comment);
            }
            return false;
        }
        if (
            nextProps.stateConnection !== this.props.stateConnection ||
            nextProps.chanels !== this.props.chanels
        ) {
            this.changeIsActive(nextProps);
            return false;
        }
        return true;
    }

    render() {
        const { active, sum, isActive } = this.state;
        const { isPermission } = this.props;

        if (!isPermission)
            return (
                <DocsOnCheck
                    text={this.props.lang.checkDocuments}
                    lang={this.props.lang}
                />
            );
        const validChanels = [...paymentVariants.keys()];
        const channels = this.props.chanels ? this.props.chanels.channels : [];
        return (
            <div className="user-replenishment">
                {!isActive ? (
                    <Block />
                ) : (
                    <div className="user-replenishment__list">
                        {channels
                            .filter(chanel =>
                                validChanels.includes(chanel.name)
                            )
                            .sort(
                                (a, b) =>
                                    validChanels.indexOf(a) -
                                    validChanels.indexOf(b)
                            )
                            .map(chanel => (
                                <ReplenishmentItem
                                    key={chanel.name}
                                    isActive={active === chanel.name}
                                    name={chanel.name}
                                    rusName={
                                        paymentVariants.get(chanel.name).name
                                    }
                                    Img={paymentVariants.get(chanel.name).img}
                                    ImgFill={
                                        paymentVariants.get(chanel.name).imgFill
                                    }
                                    handleClick={this.changeActive.bind(
                                        this,
                                        chanel.name
                                    )}
                                />
                            ))}
                    </div>
                )}

                <div className="user-replenishment__action">
                    <InputWithButton
                        sum={sum}
                        handleChangeInput={this.handleChangeInput.bind(this)}
                        handleClickButton={this.handleClickButton.bind(this)}
                        buttonCaption={this.props.nameClickButton}
                        minSum={this.minSum}
                        maxSum={this.maxSum}
                        isLoading={this.state.isLoading}
                        lang={this.props.lang}
                    />
                    <Info
                        minSum={this.minSum}
                        maxSum={this.maxSum}
                        lang={this.props.lang}
                    />
                </div>
            </div>
        );
    }

    componentDidMount() {
        if (this.props.isPermission) this.props.requstChanels();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.isPermission && this.props.isPermission)
            this.props.requstChanels();
    }
}

const mapStateToProps = state => {
    return {
        operations: state.user.info.currentOperationsData,
        lang: state.user.language_user.dict
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showModal: modal => dispatch(showModal(modal))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chanels);
