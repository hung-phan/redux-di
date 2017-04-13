import { Action } from "redux";

export type AppState = { [key: string]: any };

export interface ActionWithPayload<S> extends Action {
  payload: S
}
