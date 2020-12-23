import Todo from "./model/todo.js";

const apiRoot = "http://localhost:3000"

export async function network() {
  const todo = new Todo("Sample todo for demonstration!");

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

  const json = await addResponse.json();
  console.log(json);
}