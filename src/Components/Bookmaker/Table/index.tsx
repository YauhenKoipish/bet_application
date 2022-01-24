import React, { Component } from "react";
import { connect } from "react-redux";

import "./Style/index.less";
import NavCreate from "./Components/Nav";
import TableBookmakerOffice from "./Components/Table";
import BookmakerClientTable, {
  clientOne
} from "./Components/Table/BookmakerClientTable";
import BookmakerGroupTable from "./Components/Table/BookmakerGroupTable";
import BookmakerTable from "./Components/Table/BookmakerTable";
import { saveClientsBookmaker } from "../../../Actions/Components/BOOKMAKER";
import BookmakerEvents from "./Components/Table/BookmakerEvents";
import Test from "../../../Test";
import ButtonTest from "../../../Test/Components/Button";
import { showModalTest } from "../../../Actions/Components/Modal";

export interface NavEleme {
  name: string;
  state: boolean;
  callback: any;
  styleName: string;
  onPressFun(callback: string): void;
  icon?: string;
}

interface MyState {
  data: NavEleme[];
  componentTable: any;
  bookmakerTabs: any;
}

class TableOffice extends Component<any, MyState> {
  constructor(props) {
    super(props);
    this.state = this.getCurState(this.props);
  }

  getTableColumn(nameTab) {
    console.log(nameTab);
    switch (nameTab) {
      case "client":
        (async () => {
          await this.props.saveClients(clientOne);
        })();

        return <BookmakerClientTable />;
      case "group":
        return <BookmakerGroupTable />;
      case "bookmakers":
        return <BookmakerTable />;
      case "events":
        return <Test />;

      default:
        return <BookmakerClientTable />;
    }
  }

  getCurState(props) {
    const { match, bookmakerTabs } = props;

    const data: NavEleme[] = [];
    // структура по которой рисую столбикик в таблице
    // рисую столбиками для ровных размеров в ширину и проще писать скрипт для изменения ширины

    const componentTable = this.getTableColumn(match.params.component);

    const initNav = [
      { name: "Клиенты", nameRoute: "client" },
      { name: "Группы", nameRoute: "group" }
      // { name: "Букмекеры", nameRoute: "bookmakers" },
      // { name: "События", nameRoute: "events" }
      // { name: "Маркеты", nameRoute: "markets" },
      // { name: "Линии", nameRoute: "line" }
      // { name: "Лево Василий1", nameRoute: "levo1", icon: "makeReport" },
      // { name: "Маркетинг ст1", nameRoute: "marketing1", icon: "openBets" },
      // { name: "Лево Василий2", nameRoute: "levo2", icon: "makeReport" },
      // { name: "Маркетинг ст2", nameRoute: "marketing2", icon: "openBets" },
      // { name: "Лево Василий3", nameRoute: "levo3", icon: "makeReport" },
      // { name: "Маркетинг ст3", nameRoute: "marketing3", icon: "openBets" },
      // { name: "Лево Василий4", nameRoute: "levo4", icon: "makeReport" },
      // { name: "Маркетинг ст4", nameRoute: "marketing4", icon: "openBets" },
      // { name: "Лево Василий5", nameRoute: "levo5", icon: "makeReport" },
      // { name: "Маркетинг ст5", nameRoute: "marketing5", icon: "openBets" }
    ];

    initNav.forEach((element, index: number) => {
      data.push({
        name: element.name,
        state: element.nameRoute === match.params.component,
        callback: `/currentRates/${element.nameRoute}`,
        styleName: "",
        onPressFun: this.props.history.push.bind(this)
        // icon: element.icon
      });
    });

    return {
      data,
      componentTable,
      bookmakerTabs
    };
  }

  getSubTitle(nameComponent) {
    switch (nameComponent) {
      case "marketing":
        return "Ставки группы “Маркетинг”";

      default:
        return "";
    }
  }

  render() {
    const { data, componentTable, bookmakerTabs } = this.getCurState(
      this.props
    );

    return (
      <div className="bookmaker_table">
        <div className="flex">
          <NavCreate data={data} subArrow={false} />
          <NavCreate
            data={bookmakerTabs}
            className={"scroll_horizontal"}
            subArrow={bookmakerTabs.length > 5 ? true : false}
          />
          <ButtonTest />
        </div>
        {componentTable}
        <Test />
        {/*
        
          определяешь по url какой компонент открыт 
          дальше запрашиваем данные  и переходим в этот компонент подписывая его на эти данные 
          по клику мы выбираем компонент добавляе его в стейт id  
          при переходе на конкретную  таблицу этого компонента мы меняем url собирая структуру client/:id
          и рендорим конкретную таблицу по параметрам первым и id 
        */}
      </div>
    );
  }

  shouldComponentUpdate(nextProps) {
    // if(nextProps !== this.props)

    return true;
  }
}

const mapStateToProps = state => ({
  bookmakerTabs: state.bookmakerInformation.bookmakerTabs
});

const mapDispatchToProps = dispatch => ({
  saveClients: arrayObject => dispatch(saveClientsBookmaker(arrayObject)),
  showModal: () => dispatch(showModalTest())
});

export default connect(mapStateToProps, mapDispatchToProps)(TableOffice);
