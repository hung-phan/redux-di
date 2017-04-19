import { Action, ReducersMapObject } from "redux";

export type AppState = { [key: string]: any };

export interface ActionWithPayload<S> extends Action {
  payload: S
}

declare module "redux" {
  export interface Store<S> {
    reducers: ReducersMapObject
  }

  export function compose<R>(...funcs: Function[]): (...args: any[]) => R;
}
