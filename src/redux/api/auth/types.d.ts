namespace TODO {
  type getTodoResponse = Todo[];
  type getTodoRequest = void;

  type postTodoResponse = Todo[];
  type postTodoRequest = Todo;

  type deleteTodoResponse = Todo[];
  type deleteTodoRequest = number;

  type editTodoResponse = Todo[];
  type editTodoRequest = {
    _id?: number;
    updateTodo: Itodo;
  };
}
