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
    }
  },
  action: any
) => {
  switch (action.type) {
    case FETCH_USER_FULFILLED:
      return {
        ...state,
        joy: action.payload
      };

    default:
      return state;
  }
};

const fetchUserError = (state = null, action: ActionInterface) => {
  switch (action.type) {
    case FETCH_USER:
    case FETCH_USER_FULFILLED:
      return null;

    case FETCH_USER_REJECTED:
      return action.payload;

    default:
      return state;
  }
};
const isFetchingUser = (state = false, action: ActionInterface): boolean => {
  switch (action.type) {
    case FETCH_USER:
      return true;

    case FETCH_USER_FULFILLED:
    case FETCH_USER_REJECTED:
    case FETCH_USER_CANCELLED:
      return false;

    default:
      return state;
  }
};

export const rootReudcer = combineReducers({
  ping: pingReducer,
  user: users,
  fetchUserError,
  isFetchingUser
});
