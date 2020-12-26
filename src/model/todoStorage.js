import Todo from "./todo.js";

const apiRoot = "http://localhost:3000";
class TodoStorage {
  constructor() {
    this.storage = {};

    this.currentId = 0;
    this.todoCount = 0;
    this.todoPosponed = 0;
    this.todoDone = 0;
    this.todoDeleted = 0;
  }

  async createTodo(todoText) {
  const newTodo = new Todo(todoText);

  this.storage[this.currentId] = newTodo;
  this.currentId += 1;
  this.todoCount += 1;

  const addResponse = await fetch (
    `${apiRoot}/todos/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    }
  );

  if (!addResponse.ok) {
    console.log(`Error with status ${addResponse.status}`);
    return;
  }

  console.log(`OK with status ${addResponse.status}`);

  const addedTodo = await addResponse.json();

  return addedTodo.id;
};

  async getAllTodo() {
  const allTodoResponse = await fetch (`${apiRoot}/todos/`);

  if (!allTodoResponse.ok) {
    console.log(`Error with status ${allTodoResponse.status}`);
    return;
  }

  console.log(`OK with status ${allTodoResponse.status}`);

  return await allTodoResponse.json();
};

  convertToTodo(todoDTO) {
  const newTodo = new Todo(todoDTO.text);
  newTodo.state = todoDTO.state;
  newTodo.dateCreated = new Date(todoDTO.dateCreated);
  newTodo.dateCompleted = 
    todoDTO.dateCompleted === null ? null : new Date(todoDTO.dateCreated);

  return newTodo;
}

  totalTodoCount() {
    return this.todoCount;
  }

  totalTodoPosponed() {
    return this.todoPosponed;
  }

  totalTodoDone() {
    return this.todoDone;
  }

  totalTodoDeleted() {
    return this.todoDeleted;
  }

  getTodoById(id) {
    const todo = this.storage[id];
    return {
      id,
      text: todo.text,
      state: todo.state,
      dateCreated: new Date(todo.dateCreated),
      dateCompleted:
        todo.dateCompleted !== null ? new Date(todo.dateCompleted) : null,
    };
  }

  /* async postponeById(id, todo) {
    const todo = this.storage[id];
    todo.postpone();
    const patch = { state: todo.state };
    this.todoPosponed += 1;
    this.todoResumed -= 1;
    return await patchTodo(id, patch);
  } */

  postponeById(id) {
    const todo = this.storage[id];
    todo.postpone();
    this.todoPosponed += 1;
    this.todoResumed -= 1;
  }

  resumeById(id) {
    const todo = this.storage[id];
    todo.resume();
    this.todoPosponed -= 1;
  }

  completeById(id) {
    const todo = this.storage[id];
    todo.done();
    this.todoDone += 1;
  }

  deleteById(id) {
    delete this.storage[id];
    this.todoCount -= 1;
    this.todoDeleted += 1;
  }

  getAllTodo() {
    return Object.keys(this.storage).map((key) => {
      const todo = this.storage[key];

      return {
        id: key,
        text: todo.text,
        state: todo.state,
        dateCreated: new Date(todo.dateCreated),
        dateCompleted:
          todo.dateCompleted !== null ? new Date(todo.dateCompleted) : null,
      };
    });
  }
}

const todoStorage = new TodoStorage();

export default todoStorage;
