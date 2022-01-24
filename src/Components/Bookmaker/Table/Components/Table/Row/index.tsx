import React from "react";

export default function Row(props) {
  const { selectInfoGroup, groupItem, toggleStateGroup } = props;
  return (
    <div
      className={` bookmaker_table_column_elements  ${
        selectInfoGroup.has(groupItem.id) ? "active" : ""
      }`}
    >
      <div className={`container_row  `}>
        <div
          className={`bookmaker_table_content_item square`}
          onClick={() => toggleStateGroup(groupItem.id)}
        ></div>
        {Object.values(groupItem).map((item: any, index) => {
          let value = item;

          return (
            <div
              key={`column_${
                item && typeof item === "object" ? value.join(",") : value
              }_item_`}
              className={`bookmaker_table_content_item `}
            >
              {item && typeof item === "object" ? value.join(",") : value}
            </div>
          );
        })}
      </div>
    </div>
  );
}
