import * as React from "react";
import { Store } from "redux";
import { Route, Router } from "react-router";
import injectReducers from "./helpers/injectReducers";
import { AppState } from "./@types/app";
import { History } from "history";

export default (history: History,
                store: Store<AppState>,
                options?: Object): JSX.Element => (
  <Router history={history} {...options}>
    <Route
      path="/"
      getComponent={(nextState, cb) => {
        require.ensure(
          [
            "./components/todos",
            "./components/todos/logicBundle"
          ],
          require => {
            const {
              default: todosReducer,
              mountPoint: todosMountPoint
            } = require("./components/todos/logicBundle");
            injectReducers(store, { [todosMountPoint]: todosReducer });
            cb(null, require("./components/todos").default);
          },
          "todos-page"
        );
      }}
    />
    <Route
      path="/static-page"
      getComponent={(nextState, cb) => {
        require.ensure(
          ["./components/static-page"],
          require => {
            cb(null, require("./components/static-page").default);
          },
          "static-page"
        );
      }}
    />
  </Router>
);