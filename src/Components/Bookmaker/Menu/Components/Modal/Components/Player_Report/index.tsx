import React, { Component } from "react";
import Input from "../../../.././Components/MakeReport/Components/InputList";
import { getSportIcon } from "../../../../../../../Services/Shared";
import { MyPropsModalComponent } from "../NewGroup/";

const PlayerReport: React.FunctionComponent<MyPropsModalComponent> = props => {
  const inputModal = [
    { name: "Дата операции с" },
    { name: "Дата операции по" },
    { name: "Логины" }
  ];
  const navDiscription = [
    { name: "Ключ 1", discription: "Значиение 1" },
    { name: "Ключ 2", discription: "Значиение 2" },
    { name: "Ключ 3", discription: "Значиение 3" },
    { name: "Ключ 4", discription: "Значиение 4" },
    { name: "Ключ 5", discription: "Значиение 5" },
    { name: "Ключ 6", discription: "Значиение 6" },
    { name: "Ключ 7", discription: "Значиение 7" }
  ];

  return (
    <>
      <div className="bookmaker_modal_playerReport">
        <div className="bookmaker_modal_content_modal_playerReport">
          <div className="bookmaker_modal_title_container_playerReport">
            <div className="bookmaker_modal_title_playerReport">
              Отчет Иванов ДЖамшутка
            </div>
            <div
              className="bookmaker_modal_title_close_playerReport"
              onClick={() => props.setShowModal(false)}
            >
              {getSportIcon("close")}
            </div>
          </div>
          <div className="bookmaker_modal_content_container_playerReport">
            <div className="bookmaker_modal_content_left_playerReport">
              {inputModal.map((input, index: number) => (
                <Input
                  key={index}
                  onChange={f => f}
                  callBackParams={'i"m here'}
                  type={"text"}
                  name={input.name}
                  styleClass={"left_slide_desk_MakeReport_input"}
                  typeComponent={2}
                  placeholder={"def"}
                  className={"left_slide_desk_MakeReport_input_container"}
                />
              ))}
            </div>
            <div className="bookmaker_modal_content_right_playerReport">
              {navDiscription.map((itemMenu: any, index: number) => {
                const { name, discription } = itemMenu;

                return (
                  <div
                    className="bookmaker_modal_content_right_playerReport_discription_container"
                    key={index}
                  >
                    <div>{name}</div>
                    <div>{discription}</div>
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

export default PlayerReport;
