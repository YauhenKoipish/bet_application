import React, { Component } from "react";
import { connect } from "react-redux";
import { splitRangNumber, getIcon } from "../../../../../../../Services/Shared";

import { route } from "../../../../../../../Actions/Components/Navigation/";
import { routsName } from "../../../../../../../Router/RouterList";
class Balance extends Component {
    render() {
        const { balance, bonusBalance, inGameBalance } = this.props.balance;
        return (
            <div className="user-balance">
                <div className="user-balance__main">
                    <div className="user-balance__item">
                        <div className="user-balance__type">
                            {this.props.lang.Available}
                        </div>
                        <div className="user-balance__quantity">
                            <span>{splitRangNumber(Math.floor(balance))}</span>
                        </div>
                    </div>
                    <div className="user-balance__item">
                        <div className="user-balance__type">
                            {this.props.lang.Unseettled}
                        </div>
                        <div className="user-balance__quantity">
                            <span>
                                {splitRangNumber(Math.floor(inGameBalance))}
                            </span>
                        </div>
                    </div>

                    <div className="user-balance__item bonus-icon">
                        <div className="user-balance__type">
                            {this.props.lang.bonus}
                        </div>
                        <div className="user-balance__quantity">
                            <span>
                                {splitRangNumber(Math.floor(bonusBalance))}
                            </span>
                        </div>
                    </div>

                    <div className="user-balance__item">
                        <div className="user-balance__type">
                            {this.props.lang.general}
                        </div>
                        <div className="user-balance__quantity">
                            <span>
                                {splitRangNumber(
                                    Math.floor(balance + inGameBalance)
                                )}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="user-balance__buttons">
                    <div className="user-balance__replenishment">
                        <button
                            onClick={() =>
                                this.props.navigate(
                                    routsName.getRoutsUrl(
                                        routsName.dict.kabinet,
                                        routsName.dict.moj_schet,
                                        routsName.dict.popolnenie
                                    )
                                )
                            }
                        >
                            {this.props.lang.topUp}
                        </button>
                    </div>
                    <div className="user-balance__refresh">
                        {getIcon("refreshBalansIcon")}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        balance: state.user.info.accountData,
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
)(Balance);
