import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Store";
// import "./SettingStyle/colors.less";
import "./index.less";

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);

export const dispatch = action => {
    store.dispatch(action);
};

export const getState = () => {
    return store.getState();
};

// String.prototype.toStartSlash = function() {
//   return "/" + this;
// };

Object.defineProperty(window, "store", {
    get: () => getState()
});

window.dispatch = dispatch;

let isNeedReload = false;
let timerReload = null;

window.onfocus = () => {
    if (!timerReload) return;
    if (isNeedReload) {
        isNeedReload = false;
        return document.location.reload(true);
    }
    clearTimeout(timerReload);
    timerReload = null;
};

window.onblur = () => {
    timerReload = setTimeout(() => (isNeedReload = true), 5 * 60 * 1000);
};
