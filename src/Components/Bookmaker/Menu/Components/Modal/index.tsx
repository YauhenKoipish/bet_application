import React, { Component } from "react";
import Input from "../.././Components/MakeReport/Components/InputList";
import { getSportIcon } from "../../../../../Services/Shared";
import { connect } from "react-redux";

const Modal: React.FunctionComponent<any> = props => {
  const [isShowModal, setShowModal] = React.useState(false);
  const dataModal = [
    { name: "Название" },
    { name: "Теги" },
    {
      name: "Доступ",
      listName: [
        { name: "Зайти в аккаунт" },
        { name: "Может играть" },
        { name: "Веса маркетов" },
        { name: "Сопоставление турниров" },
        { name: "Администрирование" }
      ]
    },
    {
      name: "Вкл/Выкл",
      listName: [{ name: "Вкл" }, { name: "Выкл" }]
    }
  ];
  return (
    <>
      {isShowModal ? (
        <>
          <div
            className="bookmaker_modal_bg"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="bookmaker_modal">
            <div className="bookmaker_modal_content_modal">
              <div className="bookmaker_modal_title_container">
                <div className="bookmaker_modal_title">Новая группа</div>
                <div
                  className="bookmaker_modal_title_close"
                  onClick={() => setShowModal(false)}
                >
                  {getSportIcon("close")}
                </div>
              </div>

              <div className="bookmaker_modal_content">
                {dataModal.map(bookmaker_modal_row => {
                  const { listName, name } = bookmaker_modal_row;

                  return (
                    <div className="bookmaker_modal_row" key={name}>
                      <div className="bookmaker_modal_row_name">{name}</div>
                      <div className="bookmaker_modal_row_input">
                        {listName ? (
                          listName.map((itemMenu: any, index: number) => {
                            const { name } = itemMenu;
                            return (
                              <Input
                                key={index}
                                onChange={f => f}
                                callBackParams='i"m here'
                                type="checkbox"
                                name={name}
                                styleClass="bookmaker_modal_row_checkbox"
                                typeComponent={2}
                                placeholder="def"
                                className="bookmaker_modal_row_input_container"
                                placeholderClass="bookmaker_modal_row_checkbox_span"
                              />
                            );
                          })
                        ) : (
                          <Input
                            onChange={f => f}
                            callBackParams={'i"m here'}
                            type={"text"}
                            name={"пример"}
                            styleClass={"left_slide_desk_MakeReport_input"}
                            typeComponent={2}
                            placeholder={"def"}
                            className={
                              "left_slide_desk_MakeReport_input_container"
                            }
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={"bookmaker_modal_button"}>
              <button>Создать</button>
            </div>
          </div>
        </>
      ) : (
        " "
      )}
    </>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
