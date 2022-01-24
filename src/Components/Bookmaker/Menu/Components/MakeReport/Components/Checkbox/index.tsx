import React, { Component } from "react";
import { connect } from "react-redux";

export class CheckBox extends Component {
  render() {
    return (
      <div className="left_slide_desk_MakeReport_checkbox_container flex">
        <div className="left_slide_desk_MakeReport_checkbox_container_element flex">
          <span className="left_slide_desk_MakeReport_checkbox_container_text">
            Вкл.
          </span>
          <input
            className="left_slide_desk_MakeReport_checkbox"
            type="checkbox"
          ></input>
        </div>
        <div className="left_slide_desk_MakeReport_checkbox_container_element flex">
          <span className=" left_slide_desk_MakeReport_checkbox_container_text">
            Выкл.
          </span>
          <input
            className="left_slide_desk_MakeReport_checkbox"
            type="checkbox"
          ></input>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CheckBox);
