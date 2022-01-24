import React, { Component } from "react";
import Input from "../../../.././Components/MakeReport/Components/InputList";
import { getSportIcon } from "../../../../../../../Services/Shared";
import { connect } from "react-redux";

export const RospisModal = function() {
  const [isShowModal, setShowModal] = React.useState(false);

  const Discription = [
    { name: "Тип", discription: "Ординар" },
    {
      name: "Провайдер",
      discription: "BetRadar",
      classContainer: "paddingIdModal"
    },
    { name: "Сумма ставки", discription: "100 000.00р" },
    {
      name: "Сумма выигрыша",
      discription: "0р",
      classContainer: "paddingIdModal"
    },
    { name: "Коэффициент ставки", discription: "3.01" },
    { name: "Коэффициент выигрыша", discription: "3.01" },
    { name: "Участник 1", discription: "Ирландия" },
    { name: "Участник 2", discription: "Англия" },
    {
      name: "Описание",
      discription: (
        <div>
          <div>Маркет: Winner</div>
          <div>Исход: England</div>
          <div>Начало: 03.05.19 13:00</div>
        </div>
      )
    },
    { name: "Результат", discription: "Англия" },
    { name: "Спорт", discription: "Крикет" },
    { name: "Категория", discription: "Международные" },
    { name: "Турнир", discription: "ODI серия" }
  ];
  return (
    <>
      <div
        className="bookmaker_modal_bg"
        onClick={() => setShowModal(false)}
      ></div>
      <div className="bookmaker_modal_rospisModal">
        <div className="bookmaker_modal_content_modal_rospisModal">
          <div className="bookmaker_modal_title_container_rospisModal">
            <div className="bookmaker_modal_title_rospisModal">ID 31152</div>
            <div
              className="bookmaker_modal_title_close_rospisModal"
              onClick={() => setShowModal(false)}
            >
              {getSportIcon("close")}
            </div>
          </div>
          <div className="bookmaker_modal_content_container_rospisModal">
            <div className="bookmaker_modal_content_rospisModal">
              {Discription.map((itemMenu: any, index: number) => {
                const { name, discription, classContainer } = itemMenu;

                return (
                  <div
                    className={`bookmaker_modal_content_right_rospisModal_discription_container ${classContainer}`}
                  >
                    {" "}
                    <div className="bookmaker_modal_content_right_rospisModal_title">
                      <div>{name}</div>
                    </div>
                    <div className="bookmaker_modal_content_right_rospisModal_discription">
                      {discription}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
