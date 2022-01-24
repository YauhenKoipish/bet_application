import React from "react";

export default function SliderInfo() {
  return (
    <div className="alfa-club__legend">
      <div className="alfa-club__elem">
        <div className="alfa-club__icon points" />
        <div className="alfa-club__description">— очки</div>
      </div>
      <div className="alfa-club__elem">
        <div className="alfa-club__icon min" />
        <div className="alfa-club__description">
          — неободимый минимум очков для вступления в лигу
        </div>
      </div>
      <div className="alfa-club__elem">
        <div className="alfa-club__icon bonus-icon" />
        <div className="alfa-club__description">— бонусные единицы</div>
      </div>
      <div className="alfa-club__elem">
        <div className="alfa-club__icon cashback" />
        <div className="alfa-club__description">— кэшбек</div>
      </div>
      <div className="alfa-club__elem">
        <div className="alfa-club__icon freebet" />
        <div className="alfa-club__description">— фрибет</div>
      </div>
      <div className="alfa-club__elem">
        <div className="alfa-club__icon max" />
        <div className="alfa-club__description">
          — максимальная сумма кэшбека в лиге
        </div>
      </div>
    </div>
  );
}
