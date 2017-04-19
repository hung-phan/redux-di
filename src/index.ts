import "reflect-metadata";
import "isomorphic-fetch";
import container from "./inversify.config";
import TYPES from "./types";
import App from "./app";

const app = container.get<App>(TYPES.App);

app.render();
