import { Store } from "redux";
import * as React from "react";
import { History } from "history";
import { Route, Router } from "react-router";
import Todos from "./components/todos";
import StaticPage from "./components/static-page";
import { AppState } from "./@types/app";

export default (history: History,
                store: Store<AppState>,
                options?: Object): JSX.Element => (
  <Router history={history} {...options}>
    <Route
      path="/"
      component={Todos}
    />
    <Route
      path="/static-page"
      component={StaticPage}
    />
  </Router>
);