import React, { Component } from "react";

export default class TableWithOutrights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNeedShowEmptyTable: true
    };
  }

  changeStateIsNeedShowEmptyTable(val) {
    if (val !== this.state.isNeedShowEmptyTable) {
      this.setState({ isNeedShowEmptyTable: val });
    }
  }

  render() {
    const { Table, TableOutright } = this.props;
    const { isNeedShowEmptyTable } = this.state;
    return (
      <>
        <Table isNeedShowEmptyTable={isNeedShowEmptyTable} isOutrights={true} />
        <TableOutright
          handleEmptyTable={this.changeStateIsNeedShowEmptyTable.bind(this)}
          isHandleEmptyTable={true}
        />
      </>
    );
  }
}
