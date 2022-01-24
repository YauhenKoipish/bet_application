import React from "react";
import "./Style/index.less";
import { NavEleme } from "../..";
import { getIcon } from "../../../../../Services/Shared";
import ButtonTest from "../../../../../Test/Components/Button";
interface MyProps {
  data: NavEleme[];
  subArrow: boolean;
  className?: string;
}

const NavCreate: React.FunctionComponent<MyProps> = props => {
  const { data, subArrow, className } = props;
  const [isShowDropdown, setShowDropdown] = React.useState(false);

  const setStates = name => {
    setShowDropdown(!isShowDropdown);
  };

  return (
    <div className={`nav_class_container flex ${className ? className : ""}`}>
      <div className="nav_container">
        {data.map((elemMenu, index) => {
          const {
            name,
            state,
            onPressFun,
            callback,
            styleName,
            icon
          } = elemMenu;
          return (
            <div
              key={name + index}
              className={`${styleName ? styleName : "default_style_elem"} ${
                state ? "active" : ""
              }`}
              onClick={() => onPressFun(callback)}
            >
              {icon && (
                <div className="navCreate_icon_element">{getIcon(icon)}</div>
              )}
              {name}
            </div>
          );
        })}
      </div>
      {subArrow && (
        <div
          className="navCreate_drpdown_button"
          onClick={() => setStates(setShowDropdown)}
        >
          {getIcon("tringle")}
          {isShowDropdown && (
            <div className="navCreate_drpdown_container">
              {data.map((elemMenu, index) => {
                const {
                  name,

                  onPressFun,
                  callback
                } = elemMenu;
                return (
                  <div
                    key={name + index}
                    className="navCreate_drpdown_text"
                    onClick={() => onPressFun(callback)}
                  >
                    {name}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavCreate;
