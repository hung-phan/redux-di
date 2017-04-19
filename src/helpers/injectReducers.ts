import { combineReducers, ReducersMapObject, Store } from "redux";
import { AppState } from "../@types/app";

export default (store: Store<AppState>, reducers: ReducersMapObject) => {
  store.reducers = {
    ...store.reducers,
    ...reducers
  };

  store.replaceReducer(combineReducers(store.reducers));
};