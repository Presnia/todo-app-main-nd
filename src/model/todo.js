import todoState from "./todoState.js";

let date = new Date();

/* function formatDate() {
  
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
  
    return dd + '.' + mm + '.' + yy + ' - ' + hh + ":" + ii;
  }


console.log(formatDate()); */
export default class Todo {
  constructor(text) {
    this.text = text;
    this.state = todoState.InProcess;
    this.dateCreated = date;
    this.dateCompleted = null;
  }

  postpone() {
    this.state = todoState.Postponed;
  }

  resume() {
    this.state = todoState.InProcess;
  }

  done() {
    this.state = todoState.Done;
    this.dateCompleted = new Date();
  }
}
