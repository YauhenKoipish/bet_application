import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../MakeReport/Components/InputList";
// import { InputList } from "../MakeReport/Components/InputList";

interface NameTitle {
  name: string;
}

interface MyState {
  openBetsList: {
    title: NameTitle;
    list: NameTitle[];
  }[];
  inputListMenu: NameTitle[];
}
class OpenBets extends Component<any, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      openBetsList: [
        {
          title: { name: "Типы ставок" },
          list: [{ name: "Ординар" }, { name: "Экспресс" }, { name: "Система" }]
        },
        {
          title: { name: "Статус" },
          list: [
            { name: "Выигрывшие" },
            { name: "Проигравшие" },
            { name: "Нарассчитанные" },
            { name: "Возврат" }
          ]
        },
        {
          title: { name: "Провайдеры" },

          list: [
            { name: "BetRadar" },
            { name: "BetGenius" },
            { name: "Sporting Solution" }
          ]
        }
      ],
      inputListMenu: [
        { name: "Дата ставки с" },
        { name: "Дата ствки по" },
        { name: " Сумма ставки" },
        { name: "Сумма выплаты" },
        { name: "Спорт" },
        { name: "Id ставки" }
      ]
    };
  }

  render() {
    const { openBetsList, inputListMenu } = this.state;

    return (
      <>
        {openBetsList.map((itemMenu, index) => {
          const { title, list } = itemMenu;

          return (
            <div className="left_slide_desk_OrderList_container" key={index}>
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
                    placeholderClass={"left_slide_desk_OrderList_list_text"}
                  />
                );
              })}
            </div>
          );
        })}

        <div className="left_slide_desk_OpenBets_input_container flex">
          {inputListMenu.map((input, index: number) => (
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
      </>
    );
  }
}

export default OpenBets;
