import React, { Component } from "react";
import { getCoefInTrueFormat } from "../../Services/Shared";
import Bet from "./Bet";

export default class Express extends Component {
    get coef() {
        return [...this.props.bets.values()].reduce(
            (accum, bet) => (accum *= bet.acceptedOdd),
            1
        );
    }

    render() {
        const coef = this.props.isEdited ? this.coef : this.props.ticketCoef;
        return (
            <div className="bets__bet bet">
                <div className="bet__main">
                    <div className="bet__header">
                        <div className="bet__name">
                            {this.props.lang.express}
                        </div>
                        <div className="bet__coef">
                            {getCoefInTrueFormat(coef)}
                        </div>
                    </div>
                </div>
                {[...this.props.bets.keys()].map((key, i) => {
                    const bet = this.props.bets.get(key);
                    return (
                        <Bet
                            {...bet}
                            key={i}
                            isEdited={this.props.isEdited}
                            deleteBet={() => this.props.deleteBet(key)}
                            changeActiveOutcome={outcomeId => {
                                this.props.changeBetOutcome(key, outcomeId);
                            }}
                            pay={this.props.pay}
                            getHomeAwayName={this.props.getHomeAwayName}
                            getMarketName={this.props.getMarketName}
                            getOutcomeName={this.props.getOutcomeName}
                        />
                    );
                })}
            </div>
        );
    }
}
