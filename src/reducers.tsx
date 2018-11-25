import {
  PING,
  PONG,
  FETCH_USER_FULFILLED,
  FETCH_USER,
  FETCH_USER_REJECTED,
  FETCH_USER_CANCELLED
} from "./actions";
import { combineReducers } from "redux";
import { ActionInterface } from "./epics";

const pingReducer = (state = { isPinging: false }, action: ActionInterface) => {
  switch (action.type) {
    case PING:
      return { isPinging: true };

    case PONG:
      return { isPinging: false };

    default:
      return state;
  }
};

const users = (
  state = {
    joy: {
      avatar_url: ""
    },
    error: "",
    isFetchingUser: false
  },
  action: ActionInterface
) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, isFetchingUser: true };
    case FETCH_USER_FULFILLED:
      return {
        ...state,
        joy: action.payload,
        isFetchingUser: false
      };
    case FETCH_USER_REJECTED:
      return { ...state, error: action.payload, isFetchingUser: false };
    case FETCH_USER_CANCELLED:
      return { ...state, isFetchingUser: false };
    default:
      return state;
  }
};

export const rootReudcer = combineReducers({
  ping: pingReducer,
  user: users
});
