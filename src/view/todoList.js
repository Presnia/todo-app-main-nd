import { createElement } from "../helpers.js";
import todoStorage from "../model/todoStorage.js";
import renderTodoItem from "./todo.js";

function renderEmptyPlaceholder(doc) {
  const emptyList = createElement(doc, "div", "empty-list");
  emptyList.innerHTML = "Nothing to do";

  return emptyList;
}

export default function renderTodoList(doc) {
  const todoListElement = doc.querySelector(".todo-list");
  todoListElement.querySelectorAll("*").forEach((n) => n.remove());

  const allTodo = todoStorage.getAllTodo();

  if (allTodo.length === 0) {
    todoListElement.append(renderEmptyPlaceholder(doc));
  } else {
    allTodo.forEach((todo) => {
      const todoElement = renderTodoItem(doc, todo);
      todoListElement.append(todoElement);
    });
  }
}
