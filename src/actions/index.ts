export const PING = "PING";
export const PONG = "PONG";

export const FETCH_USER = "FETCH_USER";
export const FETCH_USER_FULFILLED = "FETCH_USER_FULFILLED";
export const FETCH_USER_CANCELLED = "FETCH_USER_CANCELLED";
export const FETCH_USER_REJECTED = "FETCH_USER_REJECTED";

export const ping = () => ({ type: PING });

export const cancelFetch = () => ({
  type: FETCH_USER_CANCELLED
});

export const fetchUser = (username: string) => ({
  type: FETCH_USER,
  payload: username
});

export const fetchUserFulfilled = (payload: any) => ({
  type: FETCH_USER_FULFILLED,
  payload
});
