import React from "react";
import { transliterate, getSportIcon } from "../../../../Services/Shared";
import Event from "./Event";

const SingleSport = ({
  name,
  icon,
  MinusOrPlus,
  key,
  clickFunc = f => f,
  route = f => f,
  isT = false,
  isOpen = false,
  toggleSport = f => f,
  events,
  addEventToFav,
  removeEventFromFav,
  favEvents,
  isArrow = true,
  isFav = true
}) => {
  const minus = getSportIcon("minus");
  const plus = getSportIcon("plus");
  const arrow = getSportIcon("arrow");
  return (
    <div
      className={"left-menu__line line-live" + (isOpen ? " open " : " ")}
      key={key}
    >
      <div
        className={
          "line-live__wrapper " + (transliterate(name, true) + "-background")
        }
        onClick={!MinusOrPlus ? route : f => f}
      >
        <div className="line-live__img">{icon}</div>

        <div className="line-live__name">{name}</div>
        {/* {!!MinusOrPlus ? (
                    <div className="line-live__icon" onClick={clickFunc}>
                        {MinusOrPlus === "minus" ? minus : plus}
                    </div>
                ) : (
                    ""
                )} */}
        {isArrow ? (
          <div className="line-live__arrow" onClick={toggleSport}>
            {arrow}
          </div>
        ) : (
          ""
        )}
      </div>
      {events ? (
        <div className="line-live__type">
          {events.map((ev, i) => (
            <Event
              eventId={ev.id}
              key={i}
              isInFav={favEvents.includes(ev.id)}
              addEventToFav={() => addEventToFav(ev.id)}
              removeEventFromFav={() => removeEventFromFav(ev.id)}
              isFav={isFav}
            />
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SingleSport;
