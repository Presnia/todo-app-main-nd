import Todo from "./todo.js";

const apiRoot = "http://localhost:5000";
class TodoStorage {
  constructor() {
    this.todoCount = 0;
  }

  convertToViewDto(todoDto) {
    return {
      id: todoDto.id,
      text: todoDto.text,
      state: todoDto.state,
      dateCreated: new Date(todoDto.dateCreated),
      dateCompleted:
        todoDto.dateCompleted !== null ? new Date(todoDto.dateCompleted) : null,
    };
  }

  convertToTodo(todoDto) {
    const todo = new Todo(todoDto.text);
    todo.state = todoDto.state;
    todo.dateCreated = new Date(todoDto.dateCreated);
    todo.dateCompleted =
      todoDto.dateCompleted === null ? null : new Date(todoDto.dateCompleted);

    return todo;
  }

  async createTodo(todoText) {
  const newTodo = new Todo(todoText);

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

  this.todoCount += 1;
};

async getTodoDtoById(id) {
    const todoResponse = await fetch(`${apiRoot}/todos/${id}`);

    if (!todoResponse.ok) {
      console.log(`Error with status ${todoResponse.status}`);
      return;
    }

    console.log(`Ok with status ${todoResponse.status}`);

    return await todoResponse.json();
  }

  async getTodoById(id) {
    return this.convertToViewDto(await this.getTodoDtoById(id));
  }

  totalTodoCount() {
    return this.todoCount;
  }

  totalStats() {
    return this.stats;
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

  async postponeById(id) {
    const todo = this.convertToTodo(this.getTodoDtoById(id));
    todo.postpone();
    const patch = { state: todo.state };
    this.todoPostponed += 1;
    this.todoResumed -= 1;
    
    return await this.patchTodo(id, patch);
  }

  async resumeById(id) {
    const todo = this.convertToTodo(this.getTodoDtoById(id));
    todo.resume();
    const patch = { state: todo.state };
    this.todoPostponed -= 1;
    return await this.patchTodo(id, patch);
  }

  async completeById(id) {
    const todo = this.convertToTodo(this.getTodoDtoById(id));
    todo.done();
    const patch = { state: todo.state, dateCompleted: todo.dateCompleted };
    this.todoDone += 1;
    return await this.patchTodo(id, patch);
  }

  async deleteById(id) {
    const deleteResponse = await fetch(`${apiRoot}/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!deleteResponse.ok) {
      console.log(`Error with status ${deleteResponse.status}`);
      return;
    }

    this.todoCount -= 1;

    console.log(`Ok with status ${deleteResponse.status}`);
  }

  async getAllTodo() {
    const allTodoResponse = await fetch(`${apiRoot}/todos/`);

    if (!allTodoResponse.ok) {
      console.log(`Error with status ${allTodoResponse.status}`);
      return;
    }

    console.log(`Ok with status ${allTodoResponse.status}`);

    const returnedDto = await allTodoResponse.json();

    this.stats = {
      done: 0,
      postponed: 0,
      inProcess: 0,
      total: 0
    }

    returnedDto.forEach(todo => {
      if (todo.state === "done") this.stats.done += 1;
      if (todo.state === "postponed") this.stats.postponed += 1;
      if (todo.state === "in-process") this.stats.inProcess += 1;
      this.stats.total += 1;
    })

    this.todoCount = returnedDto.length;

    return returnedDto.map((dto) => this.convertToViewDto(dto)).reverse();
  }
}

const todoStorage = new TodoStorage();

export default todoStorage;
