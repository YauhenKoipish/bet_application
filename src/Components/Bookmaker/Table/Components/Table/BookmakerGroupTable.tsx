import React, { Component } from "react";
import { connect } from "react-redux";
import Row from "./Row";

class BookmakerGroupTable extends Component<any, any> {
  state = {
    selectInfoGroup: new Map()
  };

  showInformationGroup(idGroup) {
    console.log("id click");
  }

  toggleStateGroup(id) {
    // const { selectInfoGroup } = this.state;
    // if (selectInfoGroup.has(id)) {
    //   selectInfoGroup.delete(id);
    // } else {
    //   selectInfoGroup.set(id, this.props.groups.get(id));
    // }
    // this.setState({ selectInfoGroup });
  }

  render() {
    const { groups } = this.props;
    const { selectInfoGroup } = this.state;
    return (
      <>
        <div className="bookmaker_table_container_table">
          <div className="bookmaker_table_container_table_column">
            {["…", "Название", "Тэг", "Доступ", "Вкл/Выкл", "id"].map(
              tabName => (
                <div
                  className="bookmaker_table_column_elements"
                  key={`column_${tabName}`}
                >
                  <div className="bookmaker_table_title_item">{tabName}</div>
                </div>
              )
            )}
          </div>
          {groups.size > 0 &&
            [...groups.values()].map(groupItem => {
              return (
                <Row
                  key={groupItem.id}
                  selectInfoGroup={selectInfoGroup}
                  groupItem={groupItem}
                  toggleStateGroup={
                    selectInfoGroup.size == 0
                      ? this.showInformationGroup.bind(this)
                      : this.toggleStateGroup.bind(this)
                  }
                />
              );
            })}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  groups: state.bookmakerInformation.group
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookmakerGroupTable);
