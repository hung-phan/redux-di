import "reflect-metadata";
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  GenericStoreEnhancer,
  Middleware,
  Store,
  StoreEnhancerStoreCreator
} from "redux";
import { injectable } from "inversify";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { persistState } from "redux-devtools";
import reducers from "./createReducer";
import { AppState } from "./@types/app";

const middlewares: Middleware[] = [thunkMiddleware];
const enhancers: GenericStoreEnhancer[] = [];

// support for development
if (
  process.env.NODE_ENV === "development" && process.env.RUNTIME_ENV === "client"
) {
  middlewares.push(createLogger({ level: "info" }));
  enhancers.push(persistState("/[?&]debug_session=([^&]+)\b/)"));
}

// support redux-devtools
if (process.env.RUNTIME_ENV === "client" && (<any> window).devToolsExtension) {
  enhancers.push((<any> window).devToolsExtension());
}

export const createAppStore = (initialState: Object): Store<AppState> => {
  const store = createStore(
    combineReducers<AppState>(reducers),
    initialState,
    compose<StoreEnhancerStoreCreator<AppState>>(
      applyMiddleware(...middlewares),
      ...enhancers
    )
  );

  // enable async reducers for each page load
  store.reducers = reducers;

  if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("./createReducer", () =>
      store.replaceReducer(require("./createReducer").default));
  }

  return store;
};

@injectable()
export default class AppStore {
  public readonly store: Store<AppState>;

  constructor() {
    this.store = createAppStore((<any> window).prerenderData || {});
  }
}
