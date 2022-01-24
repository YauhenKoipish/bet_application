import C from "../../../Constants/";

const initialState = {
  socketState: "close"
};

export const socket = (state = initialState, action) => {
  switch (action.type) {
    case C.SOCKET_CONNECT:
    case C.SOCKET_OPEN:
    case C.SOCKET_CLOSE:
    case C.SOCKET_ERROR:
      return {
        socketState: action.socketState
        // socket: action.socket
      };
    default:
      return state;
  }
};

const initialStateIsLoadedData = false;

export const isLoadedData = (state = initialStateIsLoadedData, action) => {
  if (action.type === C.IS_LOADED_DATA) {
    return action.val;
  }
  return state;
};
