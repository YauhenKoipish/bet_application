import React from "react";
import yellow from "../Img/yellow.svg";

import logoOne from "../Img/img/logo-1.svg";
import logoTwo from "../Img/img/logo-2.svg";
import logoThree from "../Img/img/logo-3.svg";
import logoFour from "../Img/img/logo-4.svg";
import logoFive from "../Img/img/logo-5.svg";
import logoSix from "../Img/img/logo-6.svg";
import logoSeven from "../Img/img/logo-7.svg";
import logoEight from "../Img/img/logo-8.svg";

export default () => {
  return (
    <div className="tv__main">
      <div className="tv__photos">
        <div className="tv__main-pic">
          <div className="tv__yellow">
            <img src={yellow} alt="" />
          </div>
          <div className="tv__free">Абсолютно бесплатно</div>
        </div>

        <div className="tv__tv" />
      </div>

      <div className="tv__buttons">
        <div className="tv__button inactive">
          <button>Смотреть</button>
        </div>
        <div className="tv__button">
          <button>Регистрация</button>
        </div>
      </div>

      <div className="tv__companies">
        <div className="tv__company">
          <img src={logoOne} alt="" />
        </div>
        <div className="tv__company">
          <img src={logoTwo} alt="" />
        </div>
        <div className="tv__company">
          <img src={logoThree} alt="" />
        </div>
        <div className="tv__company">
          <img src={logoFour} alt="" />
        </div>
        <div className="tv__company">
          <img src={logoFive} alt="" />
        </div>
        <div className="tv__company">
          <img src={logoSix} alt="" />
        </div>
        <div className="tv__company">
          <img src={logoSeven} alt="" />
        </div>
        <div className="tv__company">
          <img src={logoEight} alt="" />
        </div>
      </div>

      <div className="tv__moto">и многое другое на сайте abet.ru</div>
    </div>
  );
};
