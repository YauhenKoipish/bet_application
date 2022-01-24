import React, { Component } from "react";
import { connect } from "react-redux";

interface Table {
  subTitle: boolean;
  text?: string;
  listView: any;
}

class TableBookmakerOffice extends Component<Table> {
  render() {
    const { listView, subTitle, text } = this.props;
    return (
      <div className="bookmaker_table_container_table">
        {subTitle && (
          <div className="bookmaker_table_container_table_subTitle">{text}</div>
        )}
        <div className="bookmaker_table_container_table_column">
          {listView.map((column: any, index) => {
            const {
              name,
              contentColumn,
              personalClassName,
              onPressFunc,
              callback
            } = column;
            return (
              <div
                className="bookmaker_table_column_elements"
                key={`column_${name + index}`}
              >
                <div className="bookmaker_table_title_item">{name}</div>
                {contentColumn.map((item, index) => {
                  return (
                    <div
                      key={`column_${name + index}_item_${index}`}
                      className={`bookmaker_table_content_item ${personalClassName}`}
                      onClick={
                        onPressFunc ? () => onPressFunc(callback) : f => f
                      }
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableBookmakerOffice);
