import React, { Component } from "react";
import { getIcon } from "../../../../../Services/Shared";
export interface ListMenu {
  name: string;
  icon: string;
  onPressFunc(callback: any): void;
  callback: any;
}
interface MyProps {
  listMenu: ListMenu[];
}

const NavigationTitle: React.FunctionComponent<MyProps> = ({ listMenu }) => (
  <div className="left_slide_desk_nav_menu_container flex">
    {listMenu.map((itemMenu: any, index: number) => {
      const { name, icon, onPressFunc, callback } = itemMenu;

      return (
        <div
          className="left_slide_desk_nav_menu_title_container flex"
          key={index}
          onClick={() => onPressFunc(callback)}
        >
          <div className="left_slide_desk_nav_menu_title_Icon">
            {getIcon(icon)}
          </div>
          <div className="left_slide_desk_nav_menu_title">{name}</div>
        </div>
      );
    })}
  </div>
);

export default NavigationTitle;
