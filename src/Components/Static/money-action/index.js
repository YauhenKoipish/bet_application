import React from "react";
import Beeline from "./img/beeline.svg";
import Cards from "./img/cards.svg";
import Cupis from "./img/cupis.svg";
import Megafon from "./img/megafon.svg";
import Mts from "./img/mts.svg";
import Qiwi from "./img/qiwi.svg";
import Tele2 from "./img/tele2.svg";
import Yandex from "./img/yandex.svg";
// import "./style/money-action.css";

import { connect } from "react-redux";
const MoneyAction = props => (
  <div className="money-action">
    <div className="money-action__header">
      <span>{props.lang.variantsOteMoney}</span>
    </div>
    <div className="money-action__list">
      <div className="money-action__item">
        <div className="money-action__type">
          <div className="money-action__img">
            <img src={Cards} alt="" />
          </div>
          <div className="money-action__name">{props.banksCart}</div>
        </div>
        <div className="money-action__description">
          <div className="money-action__line">
            <div className="money-action__title">
              {props.lang.sumReplenishmnt}
            </div>
            <div className="money-action__info">{props.lang.bankCartDis}</div>
          </div>
          <div className="money-action__line">
            <div className="money-action__title">{props.lang.sumOut}</div>
            <div className="money-action__info">{props.lang.bankCartDis}</div>
          </div>
          <div className="money-action__line">
            <div className="money-action__title">{props.lang.timeAccept}</div>
            <div className="money-action__info">{props.lang.bankCartcom}</div>
          </div>
          <div className="money-action__line">
            <div className="money-action__title">{props.lang.commission}</div>
            <div className="money-action__info">{props.lang.missing}</div>
          </div>
        </div>
      </div>

      <div className="money-action__item">
        <div className="money-action__type">
          <div className="money-action__img">
            <img src={Yandex} alt="" />
          </div>
          <div className="money-action__name">{props.lang.yandexMoney}</div>
        </div>
        <div className="money-action__description">
          <div className="money-action__line">
            <div className="money-action__title">
              {props.lang.sumReplenishmnt}
            </div>
            <div className="money-action__info">{props.lang.yandexOtDo}</div>
          </div>
          <div className="money-action__line">
            <div className="money-action__title">{props.lang.sumOut}</div>
            <div className="money-action__info">
              {props.lang.yandexModeycom}
            </div>
          </div>
          <div className="money-action__line">
            <div className="money-action__title">{props.lang.timeAccept}</div>
            <div className="money-action__info">мгновенно (Макс. 2-3 дня)</div>
          </div>
          <div className="money-action__line">
            <div className="money-action__title">{props.lang.commission}</div>
            <div className="money-action__info">{props.lang.missing}</div>
          </div>
        </div>
      </div>

      <div className="money-action__item">
        <div className="money-action__type">
          <div className="money-action__img">
            <img src={Qiwi} alt="" />
          </div>
          <div className="money-action__name">{props.lang.qiwi}</div>
        </div>
        <div className="money-action__description">
          <div className="money-action__line">
            <div className="money-action__title">
              {props.lang.sumReplenishmnt}
            </div>
            <div className="money-action__info">{props.lang.qiwiDis}</div>
          </div>
          <div className="money-action__line">
            <div className="money-action__title">{props.lang.sumOut}</div>
            <div className="money-action__info">{props.lang.qiwiDis}</div>
          </div>
          <div className="money-action__line">
            <div className="money-action__title">{props.lang.timeAccept}</div>
            <div className="money-action__info">{props.lang.qiwicom}</div>
          </div>
          <div className="money-action__line">
            <div className="money-action__title">{props.lang.commission}</div>
            <div className="money-action__info">{props.lang.missing}</div>
          </div>
        </div>
      </div>

      <div className="money-action__item">
        <div className="money-action__type">
          <div className="money-action__img">
            <img src={Mts} alt="" />
          </div>
          <div className="money-action__name">{props.lang.МТС}</div>
        </div>
        <div className="money-action__description">
          <div className="money-action__line">
            <div className="money-action__title">
              {props.lang.sumReplenishmnt}
            </div>
            <div className="money-action__info">{props.lang.mtsMoney}</div>
          </div>
          <div className="money-action__line">
            <div className="money-action__title">{props.lang.timeAccept}</div>
            <div className="money-action__info">{props.lang.quikeMore}</div>
          </div>
          <div className="money-action__line">
            <div className="money-action__title">{props.lang.commission}</div>
            <div className="money-action__info">{props.lang.mtsComission}</div>
          </div>
        </div>
      </div>

      <div className="money-action__item">
        <div className="money-action__type">
          <div className="money-action__img">
            <img src={Megafon} alt="" />
          </div>
          <div className="money-action__name">{props.lang.megafon}</div>
        </div>
        <div className="money-action__description">
          <div className="money-action__line">
            <div className="money-action__title">
              {props.lang.sumReplenishmnt}
            </div>
            <div className="money-action__info">{props.lang.megafonDis}</div>
          </div>
          <div className="money-action__line">
            <div className="money-action__title">{props.lang.timeAccept}</div>
            <div className="money-action__info">{props.lang.quikeMore}</div>
          </div>
          <div className="money-action__line">
            <div className="money-action__title">{props.lang.commission}</div>
            <div className="money-action__info">{props.lang.megafonCom}</div>
          </div>
        </div>
      </div>

      <div className="money-action__item">
        <div className="money-action__type">
          <div className="money-action__img">
            <img src={Beeline} alt="" />
          </div>
          <div className="money-action__name">{props.lang.bilain}</div>
        </div>
        <div className="money-action__description">
          <div className="money-action__line">
            <div className="money-action__title">
              {props.lang.sumReplenishmnt}
            </div>
            <div className="money-action__info">{props.lang.beelaineDis}</div>
          </div>
          <div className="money-action__line">
            <div className="money-action__title">{props.lang.timeAccept}</div>
            <div className="money-action__info">{props.lang.quikeMore}</div>
          </div>
          <div className="money-action__line">
            <div className="money-action__title">{props.lang.commission}</div>
            <div className="money-action__info">{props.lang.beelaineCom}</div>
          </div>
        </div>
      </div>

      <div className="money-action__item">
        <div className="money-action__type">
          <div className="money-action__img">
            <img src={Tele2} alt="" />
          </div>
          <div className="money-action__name">{props.lang.tele2}</div>
        </div>
        <div className="money-action__description">
          <div className="money-action__line">
            <div className="money-action__title">
              {props.lang.sumReplenishmnt}
            </div>
            <div className="money-action__info">{props.lang.teleDis}</div>
          </div>
          <div className="money-action__line">
            <div className="money-action__title">{props.lang.timeAccept}</div>
            <div className="money-action__info">{props.lang.quikeMore}</div>
          </div>
          <div className="money-action__line">
            <div className="money-action__title">{props.lang.commission}</div>
            <div className="money-action__info">{props.lang.teleCom}</div>
          </div>
        </div>
      </div>

      <div className="money-action__item">
        <div className="money-action__type">
          <div className="money-action__img">
            <img src={Cupis} alt="" />
          </div>
          <div className="money-action__name">{props.lang.cipis}</div>
        </div>
        <div className="money-action__description">
          <div className="money-action__line">
            <div className="money-action__title">
              {props.lang.sumReplenishmnt}
            </div>
            <div className="money-action__info">{props.lang.cupisDis}</div>
          </div>
          <div className="money-action__line">
            <div className="money-action__title">
              {props.lang.sumConclusion}
            </div>
            <div className="money-action__info">{props.lang.cypicDisOute}</div>
          </div>
          <div className="money-action__line">
            <div className="money-action__title">{props.lang.timeAccept}</div>
            <div className="money-action__info">{props.lang.quikeMore}</div>
          </div>
          <div className="money-action__line">
            <div className="money-action__title">{props.lang.commission}</div>
            <div className="money-action__info">{props.lang.missing}</div>
          </div>
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

export default connect(
  mapStateToProps,
  null
)(MoneyAction);
