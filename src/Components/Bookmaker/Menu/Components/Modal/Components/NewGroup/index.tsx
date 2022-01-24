import React, { Component } from "react";
import Input from "../../../.././Components/MakeReport/Components/InputList";
import { getSportIcon } from "../../../../../../../Services/Shared";
import { connect } from "react-redux";
import { dispatch } from "../../../../../../..";
import { saveBookmakerGroup } from "../../../../../../../Actions/Components/BOOKMAKER";

export interface MyPropsModalComponent {
  setShowModal(val: boolean): void;
  [key: string]: any;
}

interface dataModalArea {
  name: string;
  typeArea: string;
  ref?: any;
  callBackParams: {
    nameArea: string;
    params?: any;
  };
  listName?: {
    name: string;
    active: boolean;
    callBackParams: {
      nameArea: string;
      params?: any;
    };
  }[];
  // [key: string]: any;
}

class NewGroup extends Component<MyPropsModalComponent, any> {
  dataModal: dataModalArea[];
  constructor(props) {
    super(props);
    this.dataModal = [
      {
        name: "Название",
        typeArea: "string",
        callBackParams: {
          nameArea: "name",
          params: React.createRef()
        }
      },
      {
        name: "Теги",
        typeArea: "string",

        callBackParams: {
          nameArea: "tags",
          params: React.createRef()
        }
      },
      {
        name: "Доступ",
        typeArea: "checkbox",
        callBackParams: {
          nameArea: "access",
          params: "access"
        },
        listName: [
          {
            name: "Зайти в аккаунт",
            active: false,
            callBackParams: {
              nameArea: "access",
              params: "1"
            }
          },

          {
            name: "Может играть",
            active: false,
            callBackParams: {
              nameArea: "access",
              params: "2"
            }
          },
          {
            name: "Веса маркетов",
            active: false,
            callBackParams: {
              nameArea: "access",
              params: "3"
            }
          },
          {
            name: "Сопоставление турниров",
            active: false,
            callBackParams: {
              nameArea: "access",
              params: "4"
            }
          },
          {
            name: "Администрирование",
            active: false,
            callBackParams: {
              nameArea: "access",
              params: "5"
            }
          }
        ]
      },
      {
        name: "Вкл/Выкл",
        typeArea: "checkbox",
        callBackParams: {
          nameArea: "stategroup",
          params: "boolean"
        },
        listName: [
          {
            name: "Вкл",
            active: false,
            callBackParams: {
              nameArea: "stategroup",
              params: true
            }
          },
          {
            name: "Выкл",
            active: false,
            callBackParams: {
              nameArea: "stategroup",
              params: false
            }
          }
        ]
      }
    ];
    this.state = {
      name: "",
      tags: [],
      access: [],
      stategroup: []
    };
  }

  saveGroup() {
    if (this.ckeckValidState()) {
      this.props.setGroup({
        ...this.state,
        id: `test_id_elem_${this.props.group.size}`
      });
      this.props.setShowModal(false);
    }
  }

  ckeckValidState() {
    let statickValue = false;
    let arrayWalue = false;
    const { name, stategroup } = this.state;
    const { tags, access } = this.state;

    if (name && stategroup) {
      statickValue = true;
    }
    if (!!(tags.length && access.length)) {
      arrayWalue = true;
    }
    return arrayWalue && statickValue;
  }

  changeInformation(params, callBackParams) {
    const newState = { ...this.state };
    newState[callBackParams.nameArea] = params;
    this.setState(newState);
  }

  selectBox(text, callBackParams) {
    const newState = { ...this.state };
    const index = newState[callBackParams.nameArea].indexOf(
      callBackParams.params
    );

    if (callBackParams.nameArea === "stategroup") {
      newState[callBackParams.nameArea] = [callBackParams.params];
      this.setState(newState);
      return;
    }

    if (index < 0) {
      newState[callBackParams.nameArea].push(callBackParams.params);
    } else {
      newState[callBackParams.nameArea] = newState[
        callBackParams.nameArea
      ].splice(index, 0);
    }
    this.setState(newState);
    // console.log(arg, "arg ceckbox");
  }

  render() {
    console.log(this.state, "state new group");
    return (
      <>
        <div className="bookmaker_modal">
          <div className="bookmaker_modal_content_modal">
            <div className="bookmaker_modal_title_container">
              <div className="bookmaker_modal_title">Новая группа</div>
              <div
                className="bookmaker_modal_title_close"
                onClick={() => this.props.setShowModal(false)}
              >
                {getSportIcon("close")}
              </div>
            </div>

            <div className="bookmaker_modal_content">
              {this.dataModal.map(bookmaker_modal_row => {
                const {
                  listName,
                  name,
                  typeArea,
                  callBackParams
                } = bookmaker_modal_row;
                return (
                  <div className="bookmaker_modal_row" key={name}>
                    <div className="bookmaker_modal_row_name">{name}</div>
                    <div className="bookmaker_modal_row_input">
                      {listName ? (
                        listName.map((itemMenu: any, index: number) => {
                          const { name, active, callBackParams } = itemMenu;
                          const propertyStateName = callBackParams.nameArea;

                          return (
                            <Input
                              key={index}
                              onChange={this.selectBox.bind(this)}
                              active={this.state[propertyStateName].includes(
                                callBackParams.params
                              )}
                              callBackParams={callBackParams}
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
                          onChange={this.changeInformation.bind(this)}
                          ref={callBackParams.params}
                          callBackParams={callBackParams}
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
          <div
            className={"bookmaker_modal_button"}
            onClick={() => this.saveGroup()}
          >
            <button>Создать</button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  group: state.bookmakerInformation.group
});

const mapDispatchToProps = () => ({
  setGroup: value => dispatch(saveBookmakerGroup(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewGroup);
