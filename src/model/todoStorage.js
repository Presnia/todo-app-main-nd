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

  async getTodoById(todoId, todo) {
    const getResponse = await fetch (`${apiRoot}/todos/${todoId}`,
      {
        method: "GET",
        body: JSON.stringify(todo),
      }
    );

    if (!getResponse.ok) {
      console.log(`Error with status ${getResponse.status}`);
      return;
    }

    console.log(`OK with status ${getResponse.status}`);

    const recievedTodo = await getResponse.json();

    return recievedTodo.id;
  }

  async updateTodo(todoId, todo) {
  const updateResponse = await fetch (`${apiRoot}/todos/${todoId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }
  );

  if (!updateResponse.ok) {
    console.log(`Error with status ${updateResponse.status}`);
    return;
  }

  console.log(`OK with status ${updateResponse.status}`);

  const updatedTodo = await updateResponse.json();

  return updatedTodo.id;
}

  async patchTodo(todoId, patch) {
    const patchResponse = await fetch (`${apiRoot}/todos/${todoId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patch),
      }
    );

    if (!patchResponse.ok) {
      console.log(`Error with status ${patchResponse.status}`);
      return;
    }

    console.log(`OK with status ${patchResponse.status}`);

    const patchedTodo = await patchResponse.json();

    return patchedTodo.id;
  }

  async deleteTodo(todoId, todo) {
    const deleteResponse = await fetch (`${apiRoot}/todos/${todoId}`,
      {
        method: "DELETE",
        body: JSON.stringify(todo),
      }
    );

    if (!deleteResponse.ok) {
      console.log(`Error with status ${deleteResponse.status}`);
      return;
    }

    console.log(`OK with status ${deleteResponse.status}`);

    const deletedTodo = await deleteResponse.json();

    return deletedTodo.id;
  }

  async postponeById(id) {
    const todo = this.storage[id];
    todo.postpone();
    const patch = { state: todo.state };
    this.todoPosponed += 1;
    this.todoResumed -= 1;
    return await patchTodo(id, patch);
  }

  async resumeById(id) {
    const todo = this.storage[id];
    todo.resume();
    const patch = { state: todo.state };
    this.todoPosponed -= 1;
    return await patchTodo(id, patch);
  }

  async completeById(id) {
    const todo = this.storage[id];
    todo.done();
    const patch = { state: todo.state, dateCompleted: todo.dateCompleted };
    this.todoDone += 1;
    return await patchTodo(id, patch);
  }

  async deleteById(id) {
    delete this.storage[id];
    this.todoCount -= 1;
    this.todoDeleted += 1;
    return await deleteTodo(id);
  }

  /* async getAllTodo() {
    const allTodoResponse = await fetch (`${apiRoot}/todos/`);

    if (!allTodoResponse.ok) {
      console.log(`Error with status ${allTodoResponse.status}`);
      return;
    }

    console.log(`OK with status ${allTodoResponse.status}`);

    return await allTodoResponse.json();
  };

  allTodo = getAllTodo(); */

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
