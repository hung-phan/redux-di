import { Reducer } from "redux";
import { identity } from "lodash";
import * as update from "immutability-helper";
import * as fetch from "isomorphic-fetch";
import { createAction, handleActions } from "redux-actions";
import { getUrl } from "../../helpers/handleHTTP";
import globalizeSelectors, { SelectorFunction } from "../../helpers/globalizeSelectors";
import { ActionWithPayload } from "../../@types/app";

export const mountPoint = "todos";

export type TodoType = { text: string, complete: boolean };
export type AddTodoActionType = (text: string) => ActionWithPayload<string>;
export type RemoveTodoActionType = (index: number) => ActionWithPayload<number>;
export type CompleteTodoActionType = (index: number) => ActionWithPayload<number>;
export type SetTodoActionType = (todos: TodoType[]) => ActionWithPayload<TodoType[]>;
export type FetchTodosActionType = () => (dispatch: Function) => Promise<void>;

export const selectors = globalizeSelectors<{
  getTodos: SelectorFunction<TodoType[]>
}>(
  { getTodos: identity },
  mountPoint
);

export const ADD_TODO = "todos/ADD_TODO";
export const REMOVE_TODO = "todos/REMOVE_TODO";
export const COMPLETE_TODO = "todos/COMPLETE_TODO";
export const SET_TODOS = "todos/SET_TODOS";

export const addTodo: AddTodoActionType = createAction(ADD_TODO);
export const removeTodo: RemoveTodoActionType = createAction(REMOVE_TODO);
export const completeTodo: CompleteTodoActionType = createAction(COMPLETE_TODO);
export const setTodos: SetTodoActionType = createAction(SET_TODOS);
export const fetchTodos: FetchTodosActionType = () =>
  (dispatch) =>
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