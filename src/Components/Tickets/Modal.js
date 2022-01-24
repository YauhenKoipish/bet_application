import React from "react";
import {
  splitRangNumber,
  getCoefInTrueFormat,
  getCoef,
  renameMarketName
} from "../../Services/Shared";
export default function Modal(props) {
  const {
    isActive,
    activeOutcomeId,
    line,
    pay = 0,
    market,
    changeActiveOutcome = f => f
  } = props;
  if (!isActive || !market) return "";

  const outcomeIdContainer =
    market.id === 38 || market.id === 39 || market.id === 40 ? line : market;
  return (
    <div className="bet__change modal-change">
      <div className="modal-change__list">
        <div
          onClick={() => changeActiveOutcome(activeOutcomeId)}
          className={"modal-change__element active"}
        >
          <div className="modal-change__description">
            {renameMarketName(
              line,
              market,
              outcomeIdContainer.outcomeName[
                outcomeIdContainer.outcomeId.indexOf(activeOutcomeId)
              ]
            )}
          </div>
          <div className="modal-change__coef">
            {getCoefInTrueFormat(getCoef(line, activeOutcomeId, "-"))}
          </div>
        </div>
        {outcomeIdContainer.outcomeId.map((outcomeId, i) =>
          outcomeId !== activeOutcomeId ? (
            <div
              key={i}
              onClick={() => changeActiveOutcome(outcomeId)}
              className={
                "modal-change__element " +
                (outcomeId === activeOutcomeId ? "active" : "")
              }
            >
              <div className="modal-change__description">
                {renameMarketName(
                  line,
                  market,
                  outcomeIdContainer.outcomeName[i]
                )}
              </div>
              <div className="modal-change__coef">
                {getCoefInTrueFormat(getCoef(line, outcomeId, "-"))}
              </div>
            </div>
          ) : (
            ""
          )
        )}
      </div>
      <div className="modal-change__total">
        <div className="modal-change__text">Новая выплата</div>
        <div className="modal-change__sum">{splitRangNumber(pay)}</div>
      </div>
    </div>
  );
}
