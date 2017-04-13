import { Reducer } from "redux";
import { identity } from "lodash";
import * as update from "immutability-helper";
import * as fetch from "isomorphic-fetch";
import { createAction, handleActions } from "redux-actions";
import { getUrl } from "../../helpers/handleHTTP";
import globalizeSelectors from "../../helpers/globalizeSelectors";
import { ActionWithPayload } from "../../@types/app";

export const mountPoint = "todos";

export const selectors = globalizeSelectors(
  { getTodos: identity },
  mountPoint
);

export const ADD_TODO = "todos/ADD_TODO";
export const REMOVE_TODO = "todos/REMOVE_TODO";
export const COMPLETE_TODO = "todos/COMPLETE_TODO";
export const SET_TODOS = "todos/SET_TODOS";

export type TodoType = { text: string, complete: boolean };

export const addTodo: (text: string) => ActionWithPayload<string> = createAction(ADD_TODO);
export const removeTodo: (index: number) => ActionWithPayload<number> = createAction(REMOVE_TODO);
export const completeTodo: (index: number) => ActionWithPayload<number> = createAction(COMPLETE_TODO);
export const setTodos: (todos: TodoType[]) => ActionWithPayload<TodoType[]> = createAction(SET_TODOS);
export const fetchTodos = () =>
  (dispatch: Function): Promise<TodoType[]> =>
    fetch(getUrl("/api/v1/todos"))
      .then((value: Response): Promise<TodoType[]> => value.json())
      .then((value: TodoType[]) => dispatch(setTodos(value)));

export default <Reducer<TodoType[]>> handleActions(
  {
    [ADD_TODO]: (state, { payload: text }: ActionWithPayload<string>) => update(state, {
      $push: [{ text, complete: false }]
    }),
    [REMOVE_TODO]: (state, { payload: index }: ActionWithPayload<number>) => update(state, {
      $splice: [[index, 1]]
    }),
    [COMPLETE_TODO]: (state, { payload: index }: ActionWithPayload<number>) => update(state, {
      $splice: [
        [index, 1],
        [index, 0, { ...state[index], complete: !state[index].complete }]
      ]
    }),
    [SET_TODOS]: (state, { payload: todos }: ActionWithPayload<TodoType[]>) => todos
  },
  []
);