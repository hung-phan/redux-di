import { Store } from "redux";
import * as React from "react";
import { Provider } from "react-redux";
import { AppState } from "../../@types/app";
import Router from "react-router/lib/Router";

export default ({ store, routes }: { store: Store<AppState>, routes: Router }): JSX.Element => {
  let Component: JSX.Element = (
    <Provider key="provider" store={store}>
      <div>
        {routes}
      </div>
    </Provider>
  );

  if (process.env.NODE_ENV === "development") {
    const { AppContainer } = require("react-hot-loader");

    Component = (
      <AppContainer>
        {Component}
      </AppContainer>
    );
  }

  return Component;
};
