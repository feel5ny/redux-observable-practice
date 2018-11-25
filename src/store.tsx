import { createEpicMiddleware, Options, Epic } from "redux-observable";
import { applyMiddleware, createStore, compose } from "redux";
import logger from "redux-logger";
import { rootReudcer } from "./reducers";
import { pingEpic, rootEpic } from "./epics";

const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
  const store = createStore(
    rootReudcer,
    applyMiddleware(epicMiddleware, logger)
  );

  epicMiddleware.run(rootEpic);

  return store;
}
