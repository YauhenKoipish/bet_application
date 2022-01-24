import { dispatch } from "../../";
import C from "../../Constants";
import pako from "pako";
import { decode } from "../../Server/";
import { setStateLoadData, resetState } from "../../Actions/Components/Server/";
import {
  getLocalStorageData,
  setLocalStorage
} from "../../Services/LocalStorage";
import { getLanguage } from "../../Services/SettingLanguage";

class Socket {
  socket: any;
  constructor() {
    this.socket;
  }

  waitSocekt() {
    dispatch({
      type: C.SOCKET_CONNECT,
      socketState: "connecting"
    });
  }

  socketOpen(address: string, prefix: string) {
    // this.socket = new WebSocket(address + "/" + prefix + "/");

    this.socket = new WebSocket(address);
    this.socket.binaryType = "arraybuffer";
    this.socket.onmessage = (event: any) => {
      const DATA = pako.inflate(event.data);
      const STEP = DATA[0];
      const MES = DATA.subarray(2, DATA.length);
      decode(MES, STEP);
    };

    this.socket.onopen = () => {
      if (!getLocalStorageData("Language"))
        setLocalStorage("Language", getLanguage());
      dispatch({
        type: C.SOCKET_OPEN,
        socketState: "open"
      });
    };
  }

  socketClose(actionLoad: any) {
    if (this.socket) {
      if (setStateLoadData) dispatch(actionLoad(false));
      this.socket.close();
      this.socket = null;
      dispatch(resetState());
    }
  }

  socketReconnect(address: string, prefix: string) {
    setTimeout(() => this.socketOpen(address, prefix), 0);
  }

  socketSend(data: any) {
    this.socket.send(data);
  }
}

export const createSocket = new Socket();
