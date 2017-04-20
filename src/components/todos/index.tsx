import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import TodosHeader from "./TodosHeader";
import TodosAdd from "./TodosAdd";
import TodosBody from "./TodosBody";
import TodosFooter from "./TodosFooter";
import {
  addTodo,
  AddTodoActionType,
  completeTodo,
  CompleteTodoActionType,
  removeTodo,
  RemoveTodoActionType,
  selectors,
  TodoType
} from "./logicBundle";

type TodosPropType = {
  todos: TodoType[],
};

type TodosPropActionType = {
  actions: {
    addTodo: AddTodoActionType,
    removeTodo: RemoveTodoActionType,
    completeTodo: CompleteTodoActionType
  }
};

export const Todos = ({ todos, actions }: TodosPropType & TodosPropActionType) => (
  <div className="container">
    <div className="row">
      <TodosHeader />
      <TodosAdd addTodo={actions.addTodo}/>
      <TodosBody todos={todos} removeTodo={actions.removeTodo} completeTodo={actions.completeTodo}/>
      <TodosFooter />
    </div>
  </div>
);

export const enhance = connect<TodosPropType, TodosPropActionType, Object>(
  state => ({
    todos: selectors.getTodos(state)
  }),
  dispatch => ({
    actions: bindActionCreators(
      {
        addTodo,
        removeTodo,
        completeTodo
      },
      dispatch
    )
  })
);

export default enhance(Todos);