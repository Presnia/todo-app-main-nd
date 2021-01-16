import { createElement } from "../../helpers.js";
import { clearRootElement } from "../../helpers.js";

import todoStorage from "../../model/todoStorage.js";
import configureRouter from "../../routerConfig.js";


export default function renderReportPage(doc) {
  const rootElement = clearRootElement(doc);

  const appContainer = createElement(doc, "section");
  appContainer.id = "app-container";

  const container = createElement(doc, "div");
  container.id = "todo-list";

  const todoItem = createElement(doc, "div", "item");

  const info = createElement(doc, "h2", "title-statistics");
  info.innerHTML = "ToDOs Statistics";

  const allReports = createElement(doc, "div", "all-reports");
  const allReportsBlock = createElement(doc, "div", "all-reports-block");

  const totalCount = createElement(doc, "span", "total-info info");
  totalCount.innerHTML = `Total ToDOs Count: ${todoStorage.stats.total}`

  const postponed = createElement(doc, "span", "postponed-info info");
  postponed.innerHTML = `ToDOs Postponed: ${todoStorage.stats.postponed}`;

  const done = createElement(doc, "span", "done-info info");
  done.innerHTML = `ToDOs Done: ${todoStorage.stats.done}`;

  const inprocess = createElement(doc, "span", "inprocess-info info");
  inprocess.innerHTML = `ToDOs In Process: ${todoStorage.stats.inProcess}`;

  const backToListBtn = createElement(doc, "button", "back-to-list-button");
    backToListBtn.innerHTML = "Back To List";
    backToListBtn.addEventListener("click", (e) => {
      e.preventDefault();

    todoStorage.todoPosponed = 0;
    todoStorage.todoDone = 0;
    todoStorage.todoDeleted = 0;
      
      const router = configureRouter(doc, "/");
      router.navigate("/");
    });

  allReports.append(totalCount, postponed, done, inprocess)
  allReportsBlock.append(allReports, backToListBtn)
  todoItem.append(info, allReportsBlock);
  container.append(todoItem);
  appContainer.append(container);

  rootElement.append(appContainer);
}
