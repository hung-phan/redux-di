import { Container } from "inversify";
import TYPES from "./types";
import App from "./app";
import AppStore from "./createStore";

const container = new Container();

container.bind<App>(TYPES.App).to(App);
container.bind<AppStore>(TYPES.AppStore).to(AppStore);

export default container;