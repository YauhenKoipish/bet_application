import React, { Component } from "react";
import { getCoefInTrueFormat } from "../../Services/Shared";
import Bet from "./Bet";

export default class System extends Component {
    get coef() {
        const coefs = [...this.props.bets.values()].map(ord =>
            parseFloat(ord.acceptedOdd)
        );
        const rang = this.props.systemRang;
        this.coefs = [];
        this.getCoefsArray(coefs, rang, 0, 0, new Array(rang));
        const sCoef = this.coefs.reduce((a, b) => a + b) / this.coefs.length;
        return sCoef;
    }

    getCoef(ordinars) {
        const coefs = ordinars.map(ord => parseFloat(ord.coef));
        const rang = this.getRang();
        this.coefs = [];
        this.getCoefsArray(coefs, rang, 0, 0, new Array(rang));
        const sCoef = this.coefs.reduce((a, b) => a + b) / this.coefs.length;
        return getCoefInTrueFormat(sCoef);
    }

    getCoefsArray(arr, n, i, ur, arrCoef) {
        let t = arr.length - n + (i + 1);
        if (t > arr.length) t = arr.length;
        if (ur < n) {
            return function() {
                for (i; i < t; i++) {
                    arrCoef[ur] = arr[i];
                    this.getCoefsArray(arr, n, i + 1, ur + 1, arrCoef);
                }
            }.call(this);
        } else {
            let proizv = 1;
            for (let a = 0; a < arrCoef.length; a++) {
                proizv = proizv * arrCoef[a];
            }
            this.coefs.push(proizv);
        }
    }

    render() {
        return (
            <div className="bets__bet bet">
                <div className="bet__main">
                    <div className="bet__header">
                        <div className="bet__name">
                            {this.props.lang.systemBet} {this.props.systemRang}{" "}
                            {this.props.lang.iz} {this.props.bets.size}
                        </div>
                        <div className="bet__coef">
                            {getCoefInTrueFormat(this.coef)}
                        </div>
                    </div>
                </div>

                {[...this.props.bets.values()].map((bet, i) => (
                    <Bet
                        {...bet}
                        key={i}
                        getHomeAwayName={this.props.getHomeAwayName}
                        getMarketName={this.props.getMarketName}
                        getOutcomeName={this.props.getOutcomeName}
                    />
                ))}
            </div>
        );
    }
}
