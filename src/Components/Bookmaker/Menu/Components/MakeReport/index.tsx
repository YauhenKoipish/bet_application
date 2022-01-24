import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "./Components/InputList";
import { CheckBox } from "./Components/Checkbox";

export interface inputListMenu {
  defaultValue: string;
}
interface MyState {
  inputListMenu: inputListMenu[];
}
export class MakeReport extends Component<any, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      inputListMenu: [
        {
          defaultValue: "Группы"
        },
        { defaultValue: "Id" },
        { defaultValue: "San" },
        { defaultValue: "Дата регистрации от" },
        { defaultValue: "Дата регистрации до" },
        { defaultValue: "Фамилия" },
        { defaultValue: "Имя" },
        { defaultValue: "Отчество" },
        { defaultValue: "Тэг" },
        { defaultValue: "Вес" },
        { defaultValue: "E-mail" },
        { defaultValue: "Телефон" }
      ]
    };
  }

  render() {
    const { inputListMenu } = this.state;

    return (
      <div className="left_slide_desk_MakeReport_container flex">
        {inputListMenu.map((input, index: number) => {
          return (
            <Input
              key={index}
              onChange={f => f}
              callBackParams={'i"m here'}
              type={"text"}
              name={input.defaultValue}
              styleClass={"left_slide_desk_MakeReport_input"}
              typeComponent={2}
              placeholder={"def"}
              className={"left_slide_desk_MakeReport_input_container"}
            />
          );
        })}

        <CheckBox />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MakeReport);
