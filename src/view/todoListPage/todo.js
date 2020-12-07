import { createElement } from "../../helpers.js";
import todoState from "../../model/todoState.js";

function renderTextBlock(doc, todo) {
  const textItem = createElement(doc, "h3");
  textItem.innerHTML = todo.text;
  return textItem;
}

function renderStatusPanel(doc, todo) {
  const statusPanel = createElement(doc, "p", "status-panel");
  let statusText = "Unknown state";

  if (todo.state === todoState.InProcess) statusText = "Task in progress";
  if (todo.state === todoState.Done) statusText = "Task done";
  if (todo.state === todoState.Postponed) statusText = "Task postponed";

  statusPanel.innerHTML = statusText;

  return statusPanel;
}

/* function formatDateForPanel(prefix, date) {

  let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
  
    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    let yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    let hh = date.getHours();
    if (hh < 10) hh = '0' + hh;

    let ii = date.getMinutes();
    if (ii < 10) ii = '0' + ii;
  
    return  `${prefix}: ${dd + '.' + mm + '.' + yy + ' - ' + hh + ":" + ii}`;
} */
function formatDateForPanel(prefix, date) {
  function formatDigit(n) {
    return n < 10 ? '0' + n : n;
  }

  const datePart = `${formatDigit(date.getDate())}.${
                    formatDigit(date.getMonth() + 1)}.${date.getFullYear()}`;

  const timePart = `${formatDigit(date.getHours())}:${formatDigit(date.getMinutes())}`;

  return `${prefix}: ${datePart} - ${timePart}`;
}

function renderCreatedDatePanel(doc, todo) {
  const createdDatePanel = createElement(doc, "p", "created-date-panel");

  createdDatePanel.innerHTML = formatDateForPanel("Created", todo.dateCreated);

  return createdDatePanel;
}

function renderDoneDatePanel(doc, todo) {
  const doneDatePanel = createElement(doc, "p", "done-date-panel");

  doneDatePanel.innerHTML = formatDateForPanel("Completed", todo.dateCompleted);

  return doneDatePanel;
}

function renderInfoBlock(doc, todo) {
  const infoBlock = createElement(doc, "div", "info-block");

  infoBlock.append(renderStatusPanel(doc, todo));
  infoBlock.append(renderCreatedDatePanel(doc, todo));
  if (todo.dateCompleted !== null) {
    infoBlock.append(renderDoneDatePanel(doc, todo));
  }

  return infoBlock;
}

function renderButton(doc, actionName, todoId, className, title) {
  const button = createElement(doc, "button", className);
  button.innerHTML = title;
  button.setAttribute("data-action", actionName);
  button.setAttribute("data-id", todoId);

  return button;
}

function renderControlBlock(doc, todo) {
  const controlBlock = createElement(doc, "div", "control-block");

  controlBlock.append(
    renderButton(doc, "view", todo.id, "view-button", "View")
  );

  if (todo.state === todoState.InProcess) {
    controlBlock.append(
      renderButton(doc, "postpone", todo.id, "postpone-button", "Postpone")
    );
    controlBlock.append(
      renderButton(doc, "done", todo.id, "done-button", "Done")
    );
    controlBlock.append(
      renderButton(doc, "delete", todo.id, "delete-button", "Delete")
    );
  }
  if (todo.state === todoState.Done) {
    controlBlock.append(
      renderButton(doc, "delete", todo.id, "delete-button", "Delete")
    );
  }
  if (todo.state === todoState.Postponed) {
    controlBlock.append(
      renderButton(doc, "resume", todo.id, "resume-button", "Resume")
    );
    controlBlock.append(
      renderButton(doc, "delete", todo.id, "delete-button", "Delete")
    );
  }

  return controlBlock;
}

export default function renderTodoItem(doc, todo) {
  const todoItem = createElement(doc, "div", "item");

  todoItem.append(renderTextBlock(doc, todo));
  todoItem.append(renderInfoBlock(doc, todo));
  todoItem.append(renderControlBlock(doc, todo));

  return todoItem;
}
