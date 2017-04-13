import React from "react";
import { AddTodoActionType } from "./logicBundle";

export interface TodosAddProps {
  addTodo: AddTodoActionType;
}

export interface TodosAddState {
  todo: string;
}

export default class TodosAdd extends React.PureComponent<TodosAddProps, TodosAddState> {
  state = { todo: "" };

  props: TodosAddProps;

  updateTodo = (e) => {
    this.setState({ todo: e.target.value });
  };

  addTodo = () => {
    this.props.addTodo(this.state.todo);
    this.setState({ todo: "" });
  };

  render() {
    return (
      <div className="col-md-12">
        <div className="form-inline">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Todo"
              value={this.state.todo}
              onChange={this.updateTodo}
            />
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={this.addTodo}
          >
            Add Todo
          </button>
        </div>
      </div>
    );
  }
}