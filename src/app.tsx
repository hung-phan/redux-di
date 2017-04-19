import * as React from "react";
import ReactDOM from "react-dom";
import { inject, injectable } from "inversify";
import App from "./components/app";
import { getClientHistory } from "./routes";
import TYPES from "./types";
import AppStore from "./createStore";
import { History } from "history";
import { AppState } from "./@types/app";
import { Store } from "redux";

@injectable()
export default class MainApp {
  private store: Store<AppState>;
  private history: History;
  private appDOM: HTMLElement;

  constructor(@inject(TYPES.AppStore) appStore: AppStore) {
    this.store = appStore.store;
    this.history = getClientHistory(this.store);
    this.appDOM = document.getElementById("app");
  }

  render() {
    let getRoutes = require("./routes").getRoutes;

    const renderer = () => {
      ReactDOM.render(
        <App store={this.store} routes={getRoutes(this.history, this.store)} />,
        this.appDOM
      );
    };

    if (process.env.NODE_ENV === "development" && module.hot) {
      module.hot.accept("./routes", () => {
        getRoutes = require("./routes").getRoutes;
        renderer();
      });
    }

    renderer();
  }
}
