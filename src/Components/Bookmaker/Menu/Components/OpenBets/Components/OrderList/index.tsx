import React, { Component } from "react";

const OrderList = props => {
  const { title, list } = props;

  return (
    <div className="left_slide_desk_OrderList_container">
      <div className="left_slide_desk_OrderList_title">{title.name}</div>
      {list.map((itemMenu: any, index: number) => {
        const { name } = itemMenu;

        return (
          <div className="left_slide_desk_OrderList_list_container" key={index}>
            <input
              className="left_slide_desk_MakeReport_checkbox"
              type="checkbox"
            />
            <span className="left_slide_desk_OrderList_list_text">{name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default OrderList;
