import todosReducer, { mountPoint as todosMountPoint } from "./components/todos/logicBundle";

export default {
  [todosMountPoint]: todosReducer
};
