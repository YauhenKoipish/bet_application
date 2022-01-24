import React, { Component } from "react";
import { connect } from "react-redux";

interface ClientTableState {
  selectClients: any;
}

class BookmakerClientTable extends Component<any, ClientTableState> {
  state = {
    selectClients: new Map()
  };

  toggleStateClientRow(id) {
    const { selectClients } = this.state;
    if (selectClients.has(id)) {
      selectClients.delete(id);
      this.setState({ selectClients });
    } else {
      selectClients.set(id, id);
      this.setState({ selectClients });
    }
  }

  render() {
    const { clientsBookmaker } = this.props;
    const { selectClients } = this.state;

    return (
      <div className="bookmaker_table_container_table">
        <div className="bookmaker_table_container_table_column">
          {[
            "…",
            "id_client",
            "login",
            "last_name",
            "first_name",
            "middle_name",
            "weight",
            "groups",
            "date_registr",
            "email",
            "phone_mobile",
            "switch"
          ].map(tabName => (
            <div
              className="bookmaker_table_column_elements"
              key={`column_${tabName}`}
            >
              <div className="bookmaker_table_title_item">{tabName}</div>
            </div>
          ))}
        </div>
        {clientsBookmaker.size > 0 &&
          [...clientsBookmaker.values()].map((clientInfo: any, index) => {
            const { client_id } = clientInfo;

            return (
              <div
                className={` bookmaker_table_column_elements  ${
                  selectClients.has(client_id) ? "active" : ""
                }`}
                key={`column_${client_id}`}
                onClick={() => this.toggleStateClientRow(client_id)}
              >
                <div className="container_row">
                  <div
                    key={`column_${client_id}_item_`}
                    className={`bookmaker_table_content_item square`}
                    // onClick={
                    //   onPressFunc ? () => onPressFunc(callback) : f => f
                    // }
                  ></div>
                  {Object.values(clientInfo).map((item: any, index) => {
                    let value = item;

                    return (
                      <div
                        key={`column_${
                          item && typeof item === "object"
                            ? value.join(",")
                            : value
                        }_item_`}
                        className={`bookmaker_table_content_item `}
                        // onClick={
                        //   onPressFunc ? () => onPressFunc(callback) : f => f
                        // }
                      >
                        {item && typeof item === "object"
                          ? value.join(",")
                          : value}
                      </div>
                    );
                  })}
                  <div
                    key={`column_${index}_item_`}
                    className={`bookmaker_table_content_item `}
                    // onClick={
                    //   onPressFunc ? () => onPressFunc(callback) : f => f
                    // }
                  >
                    Выкл
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  clientsBookmaker: state.bookmakerInformation.clients
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookmakerClientTable);

export const clientOne = {
  id_client: 1001, // ид, required, not null, integer
  login: "saneklev", // логин, required, not null, not empty, string
  last_name: "Левочко", // фамилия, required, not null, not empty, string
  first_name: "Александр", // имя, required, not null, not empty, string
  middle_name: "Борисович", // отчество, required, not empty, string
  weight: 11, // вес от 1 до 11, required, not null, integer
  groups: [
    // группы, required, not null, array of
    "Администраторы", // 																			имя группы, required, not null, not empty, string
    "Букмекеры"
  ],
  date_registr: "01.01.2020T11:00:00", // датавремя регистрации utc, required, not null, not empty, string
  email: "saneklev@googla@com", // мыло, required, not null, not empty, string
  phone_mobile: "+79251112233" // моб телефон, required, not null, not empty, string
};
