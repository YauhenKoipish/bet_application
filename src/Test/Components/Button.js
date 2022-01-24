import React from "react";
import { showModalTest } from "../../Actions/Components/Modal/";
import { dispatch } from "../../";

export default function index() {
  return (
    <div
      className="version-block test"
      onClick={() => dispatch(showModalTest())}
    >
      <span>События</span>
    </div>
  );
}
