import todoState from "../../model/todoState.js";

import { createElement } from "../../helpers.js";
import { clearRootElement } from "../../helpers.js";

import { getTodoEventHandlers } from "../../events/todoEventHandlers.js";
import { setupEventListeners } from "../../events.js";



export default function renderReportPage(doc, todo) {
  const rootElement = clearRootElement(doc);

  const appContainer = createElement(doc, "section");
  appContainer.id = "app-container";

  const container = createElement(doc, "div");
  container.id = "report-list";

  const reportItem = createElement(doc, "div", "item");

  /* todoItem.append(renderTextBlock(doc, todo));
  todoItem.append(renderInfoBlock(doc, todo));
  todoItem.append(renderControlBlock(doc, todo)); */

  container.append(reportItem);
  appContainer.append(container)
  rootElement.append(appContainer);

  setupEventListeners(doc, getTodoEventHandlers(doc));
}