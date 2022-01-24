import React, { Component } from "react";
import Input from "../../../.././Components/MakeReport/Components/InputList";
import { getSportIcon } from "../../../../../../../Services/Shared";

import { MyPropsModalComponent } from "../NewGroup/";

const PlayerTopBets: React.FunctionComponent<MyPropsModalComponent> = props => {
  const ModalList = [
    {
      title: { name: "Вид" },
      list: [{ name: "Спорт" }, { name: "Турнир" }, { name: "Маркет" }]
    },
    {
      title: { name: "Тип" },
      list: [{ name: "Ординары" }, { name: "Мульти" }, { name: "Бетбилдер" }]
    }
  ];
  const Table = [
    { ves: "5", kolvo: "73", drop: "21 000 000 000.00" },
    { ves: "1", kolvo: "53", drop: "22 000 000 000.00" },
    { ves: "2", kolvo: "63", drop: "23 000 000 000.00" }
  ];

  return (
    <>
      <div className="bookmaker_modal_topBets">
        <div className="bookmaker_modal_content_modal_topBets">
          <div className="bookmaker_modal_title_container_topBets">
            <div className="bookmaker_modal_title_topBets">
              Топ ставок Иванов ДЖамшутка
            </div>
            <div
              className="bookmaker_modal_title_close_topBets"
              onClick={() => props.setShowModal(false)}
            >
              {getSportIcon("close")}
            </div>
          </div>
          <div className="bookmaker_modal_content_container_topBets">
            <div className="bookmaker_modal_content_left_topBets">
              {ModalList.map((itemMenu, index) => {
                const { title, list } = itemMenu;

                return (
                  <div
                    className="left_slide_desk_OrderList_container "
                    key={index}
                  >
                    <div className="left_slide_desk_OrderList_title">
                      {title.name}
                    </div>
                    {list.map((itemMenu: any, index: number) => {
                      const { name } = itemMenu;

                      return (
                        <Input
                          key={index}
                          onChange={f => f}
                          callBackParams={'i"m here'}
                          type={"checkbox"}
                          name={name}
                          styleClass={"left_slide_desk_MakeReport_checkbox"}
                          typeComponent={2}
                          placeholder={"def"}
                          className={"left_slide_desk_OrderList_list_container"}
                          placeholderClass={
                            "left_slide_desk_OrderList_list_text"
                          }
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div className="bookmaker_modal_content_right_topBets">
              <div className="bookmaker_modal_content_right_topBets_header_ves">
                <div className="bookmaker_modal_content_right_topBets_header">
                  Вес
                </div>

                {Table.map((itemMenu: any, index: number) => {
                  const { ves } = itemMenu;

                  return (
                    <div
                      className="bookmaker_modal_content_right_topBets_row"
                      key={index}
                    >
                      <div>{ves}</div>
                    </div>
                  );
                })}
              </div>
              <div className="bookmaker_modal_content_right_topBets_header_kolvo">
                <div className="bookmaker_modal_content_right_topBets_header">
                  Количество
                </div>

                {Table.map((itemMenu: any, index: number) => {
                  const { kolvo } = itemMenu;

                  return (
                    <div
                      className="bookmaker_modal_content_right_topBets_row"
                      key={index}
                    >
                      <div>{kolvo}</div>
                    </div>
                  );
                })}
              </div>
              <div className="bookmaker_modal_content_right_topBets_header_drop">
                <div className="bookmaker_modal_content_right_topBets_header">
                  Дроп
                </div>

                {Table.map((itemMenu: any, index: number) => {
                  const { drop } = itemMenu;

                  return (
                    <div
                      className="bookmaker_modal_content_right_topBets_row"
                      key={index}
                    >
                      <div>{drop}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerTopBets;
