import React from "react";
import Input from "../../../.././Components/MakeReport/Components/InputList";
import { getSportIcon } from "../../../../../../../Services/Shared";
import { MyPropsModalComponent } from "../NewGroup/";

const PlayerInformation: React.FunctionComponent<MyPropsModalComponent> = props => {
  const navModal = [
    { name: "Личная информация" },
    { name: "Данные по игре" },
    { name: "Удержание" },
    { name: "Статистика 1000 ставок" }
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
      <div className="bookmaker_modal_playerInformation">
        <div className="bookmaker_modal_content_modal_playerInformation">
          <div className="bookmaker_modal_title_container_playerInformation">
            <div className="bookmaker_modal_title_playerInformation">
              Информация Иванов ДЖамшутка
            </div>
            <div
              className="bookmaker_modal_title_close_playerInformation"
              onClick={() => props.setShowModal(false)}
            >
              {getSportIcon("close")}
            </div>
          </div>
          <div className="bookmaker_modal_content_container_playerInformation">
            <div className="bookmaker_modal_content_left_playerInformation">
              {navModal.map((itemMenu: any, index: number) => {
                const { name } = itemMenu;

                return (
                  <Input
                    key={index}
                    onChange={f => f}
                    callBackParams='i"m here'
                    type="radio"
                    name={name}
                    styleClass="bookmaker_modal_row_checkbox"
                    typeComponent={2}
                    placeholder="def"
                    className="bookmaker_modal_row_input_container"
                    placeholderClass="bookmaker_modal_row_checkbox_span"
                  />
                );
              })}
            </div>
            <div className="bookmaker_modal_content_right_playerInformation">
              {navDiscription.map((itemMenu: any, index: number) => {
                const { name, discription } = itemMenu;

                return (
                  <div
                    className="bookmaker_modal_content_right_playerInformation_discription_container"
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

export default PlayerInformation;
