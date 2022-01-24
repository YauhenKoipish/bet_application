import React from "react";

import dvorovaya from "../img/dvorovaya.svg";
import lubitelskaya from "../img/lubitelskaya.svg";
import pro from "../img/pro.svg";
import pervaya from "../img/pervaya.svg";
import premier from "../img/premier.svg";
import chempionskaya from "../img/chempionskaya.svg";

// import "../style/alfa-club.css";

const content = [
  {
    image: dvorovaya,
    alt: "Дворовая Лига",
    points: "11",
    state: "hidden"
  },
  {
    image: lubitelskaya,
    alt: "Любительская Лига",
    points: "11",
    state: "hidden"
  },
  {
    image: pro,
    alt: "Про Лига",
    points: "11",
    state: "hidden"
  },
  {
    image: pervaya,
    alt: "Первая Лига",
    points: "11",
    state: "previous"
  },
  {
    image: premier,
    alt: "Премьер Лига",
    points: "11",
    state: "active"
  },
  {
    image: chempionskaya,
    alt: "Чемпионская Лига",
    points: "11",
    state: "next"
  }
];

const Slider = () => {
  return (
    <div className="alfa-club__slider">
      {content.map((item, index) => (
        <div key={index} className={"alfa-club__item " + item.state}>
          <div className="alfa-club__img">
            <img src={item.image} alt={item.alt} />
          </div>
          <div className="alfa-club__status">
            <span className="alfa-club__points">15</span>
          </div>
        </div>
      ))}

      <div className="alfa-club__toggle-left" />
      <div className="alfa-club__toggle-right" />
    </div>
  );
};

export default Slider;
