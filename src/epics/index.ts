import { Observable, race, of } from "rxjs";
import {
  PING,
  PONG,
  FETCH_USER,
  fetchUserFulfilled,
  FETCH_USER_CANCELLED,
  FETCH_USER_REJECTED
} from "src/actions";
import { Action } from "redux";
import { ajax } from "rxjs/ajax";
import {
  ofType,
  combineEpics,
  StateObservable,
  ActionsObservable
} from "redux-observable";
import {
  mergeMap,
  map,
  takeUntil,
  delay,
  catchError,
  mapTo
} from "rxjs/operators";

export interface ActionInterface {
  type: string;
  payload: any;
}

export const pingEpic = (
  action$: ActionsObservable<Action>
): Observable<Action> => {
  return action$.pipe(
    ofType(PING),
    delay(1000),
    mapTo({ type: PONG })
  );
};

export const fetchUserEpic = (
  action$: Observable<Action>,
  state$: StateObservable<any>
): Observable<Action> => {
  return action$.pipe(
    ofType(FETCH_USER),
    mergeMap((action: ActionInterface) =>
      race(
        ajax.getJSON(`https://api.github.com/users/${action.payload}`).pipe(
          delay(1000),
          map(response => fetchUserFulfilled(response)),
          takeUntil(action$.pipe(ofType(FETCH_USER_CANCELLED))),
          catchError(error =>
            of({
              type: FETCH_USER_REJECTED,
              payload: error.xhr.response,
              error: true
            })
          )
        )
      )
    )
  );
};

export const rootEpic = combineEpics(pingEpic, fetchUserEpic);
