import Todo from "./model/todo.js";

const apiRoot = "http://localhost:3000";

async function createTodo(todoText) {
  const todo = new Todo(todoText);

  const addResponse = await fetch (
    `${apiRoot}/todos/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
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

async function getAllTodo() {
  const allTodoResponse = await fetch (`${apiRoot}/todos/`);

  if (!allTodoResponse.ok) {
    console.log(`Error with status ${allTodoResponse.status}`);
    return;
  }

  console.log(`OK with status ${allTodoResponse.status}`);

  return await allTodoResponse.json();
};

function convertToTodo(todoDTO) {
  const todo = new Todo(todoDTO.text);
  todo.state = todoDTO.state;
  todo.dateCreated = new Date(todoDTO.dateCreated);
  todo.dateCompleted = 
    todoDTO.dateCompleted === null ? null : new Date(todoDTO.dateCreated);

  return todo;
}

async function updateTodo(todoId, todo) {
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

async function patchTodo(todoId, patch) {
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

  async function postponeById(id, todo) {
    todo.postpone();
    /* this.todoPosponed += 1;
    this.todoResumed -= 1; */
    const patch = { state: todo.state };
    return await patchTodo(id, patch);
  }

  async function resumeById(id, todo) {
    todo.resume();
    this.todoPosponed -= 1;
    const patch = { state: todo.state };
    return await patchTodo(id, patch);
  }

  async function completeById(id, todo) {
    todo.done();
    this.todoDone += 1;
    const patch = { state: todo.state, dateCompleted: todo.dateCompleted };
    return await patchTodo(id, patch);
  }

export async function network() {
  const todoNumber = Math.round(Math.random() * 1000);
  const newTodoId = await createTodo(`One more todo record ${todoNumber}`);

  console.log(`=> ${newTodoId}`);

  const allTodo = await getAllTodo();

  const changedTodoPosition = Math.round(Math.random() * allTodo.length);
  const todoDTO = allTodo[changedTodoPosition];
  const changedTodoId = todoDTO.id;

  const todo = convertToTodo(todoDTO);

  console.log(todo);
  postponeById(changedTodoId, todo);
  console.log(todo); 

  const id = await patchTodo(changedTodoId, todo);
  console.log(`=> ${id}`);
}