import todoState from "../../model/todoState.js";

import { createElement } from "../../helpers.js";
import { clearRootElement } from "../../helpers.js";

import { getTodoEventHandlers } from "../../events/todoEventHandlers.js";
import { setupEventListeners } from "../../events.js";

function renderStatusPanel(doc, todo) {
  const statusTotalPanel = createElement(doc, "p", "status-panel-total");
  const statusProcessPanel = createElement(doc, "p", "status-panel-process");
  const statusPostponedPanel = createElement(doc, "p", "status-panel-postponed");
  const statusDonePanel = createElement(doc, "p", "status-panel-done");
  let statusText = "Unknown state";

  if (todo.state === todoState.InProcess) statusText = `Tasks total count: 
                                                        ${todoStorage.totalTodoCount()}`;
  if (todo.state === todoState.InProcess) statusText = `Tasks in progress: 7`;
  if (todo.state === todoState.Done) statusText = `Tasks done: 34`;
  if (todo.state === todoState.Postponed) statusText = `Tasks postponed: 3`;

  statusTotalPanel.innerHTML = statusText;
  statusProcessPanel.innerHTML = statusText;
  statusPostponedPanel.innerHTML = statusText;
  statusDonePanel.innerHTML = statusText;

  return statusPanel;
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
    renderButton(
      doc,
      "back-to-list",
      todo.id,
      "back-to-list-button",
      "Back To List"
    )
  );

  return controlBlock;
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

export default function renderReportPage(doc, todo) {
  const rootElement = clearRootElement(doc);

  const appContainer = createElement(doc, "section");
  appContainer.id = "app-container";

  const container = createElement(doc, "div");
  container.id = "report-list";

  const reportItem = createElement(doc, "div", "item");

  reportItem.append(renderInfoBlock(doc, todo));
  reportItem.append(renderControlBlock(doc, todo));

  container.append(reportItem);
  appContainer.append(container)
  rootElement.append(appContainer);

  setupEventListeners(doc, getTodoEventHandlers(doc));
}