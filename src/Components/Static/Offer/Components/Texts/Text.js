import React, { Component } from "react";

export default class Text extends Component {
  render(props) {
    return <div>{props.children}</div>;
  }

  componentDidMount() {}
}
