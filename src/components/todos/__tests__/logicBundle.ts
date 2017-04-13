import "mocha";
import * as nock from "nock";
import { assert } from "chai";
import * as td from "testdouble";
import reducer, { addTodo, completeTodo, fetchTodos, removeTodo, setTodos } from "../logicBundle";

describe("Module: Todos", () => {
  describe("Actions", () => {
    context("fetchTodos", () => {
      const todos = [
        { text: "Todo 1", complete: false },
        { text: "Todo 2", complete: false },
        { text: "Todo 3", complete: false },
        { text: "Todo 4", complete: false }
      ];
      let RUNTIME_ENV;

      before(() => {
        RUNTIME_ENV = process.env.RUNTIME_ENV;

        process.env.RUNTIME_ENV = "server";

        nock(`http://localhost:${process.env.PORT}`)
          .get("/api/v1/todos")
          .reply(200, todos);
      });

      after(() => {
        process.env.RUNTIME_ENV = RUNTIME_ENV;
      });

      it('should return a function when calls "fetchTodos" then return "setTodos" action', async (): Promise<void> => {
        const dispatch = td.function();
        const action = fetchTodos();

        await action(dispatch);

        td.verify(dispatch(setTodos(todos)));
      });
    });
  });

  describe("Reducer", () => {
    it("should return the default state", () => {
      assert.deepEqual(
        reducer([], { type: "ANOTHER_ACTION", payload: "random value" }),
        []
      );
    });

    it("should return a todos list with 1 todo item when calls 'addTodo' action", () => {
      assert.deepEqual(reducer([], addTodo("do chore")), [
        { text: "do chore", complete: false }
      ]);
    });

    it("should return an empty todos list when calls 'removeTodo' action", () => {
      assert.deepEqual(
        reducer([{ text: "do chore", complete: false }], removeTodo(0)),
        []
      );
    });

    it("should return an todos list when calls 'setTodos' action", () => {
      assert.deepEqual(
        reducer([], setTodos([{ text: "do chore", complete: false }])),
        [{ text: "do chore", complete: false }]
      );
    });

    it("should return a todos list with 1 completed todo when calls 'completeTodo' action", () => {
      assert.deepEqual(
        reducer([{ text: "do chore", complete: false }], completeTodo(0)),
        [{ text: "do chore", complete: true }]
      );

      assert.deepEqual(
        reducer([{ text: "do chore", complete: true }], completeTodo(0)),
        [{ text: "do chore", complete: false }]
      );
    });
  });
});