import * as React from "react";
import * as ReactDOM from "react-dom";
import { Store } from "redux";
import { browserHistory } from "react-router";
import { inject, injectable } from "inversify";
import App from "./components/app";
import TYPES from "./types";
import AppStore from "./createStore";
import { AppState } from "./@types/app";

@injectable()
export default class MainApp {
  private store: Store<AppState>;
  private appDOM: HTMLElement;

  constructor(@inject(TYPES.AppStore) appStore: AppStore) {
    this.store = appStore.store;
    this.appDOM = document.getElementById("app");
  }

  render() {
    let getRoutes = require("./routes").default;

    const renderer = () => {
      ReactDOM.render(
        <App store={this.store} routes={getRoutes(browserHistory, this.store)} />,
        this.appDOM
      );
    };

    if (process.env.NODE_ENV === "development" && module.hot) {
      module.hot.accept("./routes", () => {
        getRoutes = require("./routes").default;
        renderer();
      });
    }

    renderer();
  }
}
